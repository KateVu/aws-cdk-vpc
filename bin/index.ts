#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VPCStack } from '../lib/vpc-stack';

const app = new cdk.App();
const vpcStack = new VPCStack(app, 'VpcStack', {
  stackName: 'VPCStack-Kate',
  env: {
    region: 'ap-southeast-2',
    account: process.env.AWS_ACCOUNT_ID,
  }
});

cdk.Tags.of(vpcStack).add('createdby', 'KateVu')
cdk.Tags.of(vpcStack).add('createdvia', 'AWS-CDK')
cdk.Tags.of(vpcStack).add('repo', 'https://gitlab.mantelgroup.com.au/kate.vu/cdk-vpc')