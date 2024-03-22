# Cdk 3-tier VPC
This module deploys a 3-tier VPC. The following resources are managed:
- VPC
- Subnets
- Routes
- NACLs
- Internet Gateway
- NAT Gateways
## Getting started
### Check your config files in config folder:
- aws_account.yaml: map aws account name with aws account id. If you want to deploy to new aws account add new item in the file like this
```
- name: sandpit1
  account_id: 'your aws account id - please leave the quote here so we do not face type error'
```   

- Obtain aws credential for the aws account (check ~/.aws/credential or ~/.aws/cli/cache)
- export your AWS Account id: `export AWS_ACCOUNT_ID=your_account_id`. This variable is used in bin/index.ts
- synth: cdk synth
- deploy: cdk deploy
- destroy: cdk destroy
