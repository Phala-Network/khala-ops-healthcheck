#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('host', {
        alias: 'h'
    })
    .option('port', {
        alias: 'p',
        type: 'integer',
        default: ''
    })
    .option('protocol', {
        default: 'http'
    })
    .demandOption(['host', 'port'])
    .argv

require('dotenv').config();

const { HttpProvider } = require('@polkadot/rpc-provider/http');
const { ApiPromise } = require('@polkadot/api');
const typedefs = require('@phala/typedefs').khalaDev;

console.warn = function() {}

(async() => {
    let endpoint = `${argv["protocol"]}://${argv["host"]}`
    if (argv["port"] !== '') {
        endpoint = `${endpoint}:${argv["port"]}`
    }

    const provider = new HttpProvider(endpoint);
    const api = await ApiPromise.create({
        provider: provider,
        types: typedefs
    })

    const onChainTimestamp = (await api.query.timestamp.now()).toNumber();
    const localTimestamp = Date.now();
    const gapInMinutes = (localTimestamp - onChainTimestamp) / 1000 / 60;

    const headBlockNumber = (await api.rpc.chain.getHeader()).number.toNumber();

    console.log(JSON.stringify({
        onChainTimestamp,
        localTimestamp,
        gapInMinutes,
        headBlockNumber
    }))
    process.exit(0)
})().catch(console.error).finally(() => process.exit(1));
