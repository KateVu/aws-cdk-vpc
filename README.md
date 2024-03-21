# Cdk 3-tier VPC
This module deploys a 3-tier VPC. The following resources are managed:
    VPC
    Subnets
    Routes
    NACLs
    Internet Gateway
    NAT Gateways
## Getting started
- Obtain aws credential for the aws account (check ~/.aws/credential or ~/.aws/cli/cache)
- export your AWS Account id: `export AWS_ACCOUNT_ID=your_account_id`. This variable is used in bin/index.ts
- synth: cdk synth
- deploy: cdk deploy
- destroy: cdk destroy
