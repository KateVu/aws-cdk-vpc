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
- aws_account.yaml: map aws account name with aws account id.
Add a file name aws_account.yaml in config folder and add your account name and id
```
- name: sandpit1
  account_id: 'your aws account id - please leave the quote here so we do not face type error'
```   
If you want to deploy to new aws account just add more item in the list
- `<aws_account_name>-<region>.yaml`: add vpc config file for your aws account with name systax like this. If you have more account acc, add another file for it. 

### How to deploy
- Obtain aws credential for the aws account (check ~/.aws/credential or ~/.aws/cli/cache)
- export your environment variable if you do not want to use the default one. This variable is used in bin/index.ts
- synth: cdk synth
- deploy: cdk deploy
- destroy: cdk destroy
