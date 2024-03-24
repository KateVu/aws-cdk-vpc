# Cdk 3-tier VPC
This module deploys a 3-tier VPC. The following resources are managed:
- VPC
- Subnets
- Routes
- NACLs
- Internet Gateway
- NAT Gateways
## Getting started
### Update mapping for account name and aws account id:
- If there is no aws_account.yaml file in config folder, create new one, example can be found in aws_account-template.yaml file.
Add a file name aws_account.yaml in config folder and add your account name and id
```
- name: sandpit1
  account_id: 'your aws account id - please leave the quote here so we do not face type error'
```   
- Create vpc config file for target account and region you want to deploy
  - syntax for file name: <aws_account_name>-<region>.yaml, create/update file and put it in config folder
  - Example can be find in sandpit1-ap-southeast-2.yaml
    - 

### How to deploy
- Obtain aws credential for the aws account (check ~/.aws/credential or ~/.aws/cli/cache)
- export your environment variable if you do not want to use the default one. This variable is used in bin/index.ts
- synth: cdk synth
- deploy: cdk deploy
- destroy: cdk destroy
