import { Stack, StackProps, Tags } from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'
import { VpcConfig, naclRule, createNACLs, createPublicSubnet, createPrivateSubnet, createDataSubnet } from './utils';

/**
 * Create vpc with 3 subnets: public, private, and data
 * Create 3 nacls
 * Create route tables
 * Create IWG and NAT Gateway
 * Tag resource with list of tag
 */
export class VPCStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcConfig: VpcConfig = {
      vpcName: 'VPC-Kate',
      ipAddresses: '10.0.0.0/16',

      publicSubnets: [
        {
          availabilityZone: 'a',
          ipAddress: '10.0.1.0/24',
          mapPublicIpOnLaunch: true
        },
        {
          availabilityZone: 'b',
          ipAddress: '10.0.4.0/24',
          mapPublicIpOnLaunch: true
        },
        {
          availabilityZone: 'c',
          ipAddress: '10.0.7.0/24',
          mapPublicIpOnLaunch: true
        },
      ],
      privateSubnets: [
        {
          availabilityZone: 'a',
          ipAddress: '10.0.2.0/24',
        },
        {
          availabilityZone: 'b',
          ipAddress: '10.0.5.0/24',
        },
        {
          availabilityZone: 'c',
          ipAddress: '10.0.8.0/24',
        }
      ],
      dataSubnets: [
        {
          availabilityZone: 'a',
          ipAddress: '10.0.3.0/24',
        },
        {
          availabilityZone: 'b',
          ipAddress: '10.0.6.0/24',
        },
        {
          availabilityZone: 'c',
          ipAddress: '10.0.9.0/24',
        }
      ]
    }

    const publicSubnetNACLs: naclRule[] = [
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 1950,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all http traffic
        protocol: "6",
        startPort: 80,
        endPort: 80,
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 1951,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all https traffic
        protocol: "6",
        startPort: 443,
        endPort: 443,
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 2051,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_tcp
        protocol: "6",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 2052,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_upd
        protocol: "17",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "ingress"
      },
      //Egress
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 1950,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all http traffic
        protocol: "6",
        startPort: 80,
        endPort: 80,
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 1951,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all https traffic
        protocol: "6",
        startPort: 443,
        endPort: 443,
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 2051,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_tcp
        protocol: "6",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 2052,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_upd
        protocol: "17",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "egress"
      },
    ]

    const privateSubnetNACLs: naclRule[] = [
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 2051,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_tcp
        protocol: "6",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "ingress"
      },
      {
        ruleNumber: 2052,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all ephemeral_upd
        protocol: "17",
        startPort: 1024,
        endPort: 65535,
        isIpV4Block: true,
        direction: "ingress"
      },
      //Egress
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 1950,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all http traffic
        protocol: "6",
        startPort: 80,
        endPort: 80,
        isIpV4Block: true,
        direction: "egress"
      },
      {
        ruleNumber: 1951,
        ruleAction: "allow",
        cidrBlock: "0.0.0.0/0", //Allow all https traffic
        protocol: "6",
        startPort: 443,
        endPort: 443,
        isIpV4Block: true,
        direction: "egress"
      },
    ]

    const dataSubnetNACLs: naclRule[] = [
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "ingress"
      },
      //Egress
      {
        ruleNumber: 651,
        ruleAction: "allow",
        cidrBlock: vpcConfig.ipAddresses, //Allow all vpc traffic
        protocol: "-1",
        isIpV4Block: true,
        direction: "egress"
      },
    ]

    //Create vpc
    const vpc = new ec2.Vpc(this, 'VPC-Kate', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      subnetConfiguration: []
    })

    //Create iwg and attached to the vpc
    const igw = new ec2.CfnInternetGateway(this, 'InternetGateway', {
      tags: [{
        key: 'Name',
        value: `IGW-${vpcConfig.vpcName.toUpperCase()}`,
      }],
    })
    new ec2.CfnVPCGatewayAttachment(this, 'IGWAttachment', {
      vpcId: vpc.vpcId,
      internetGatewayId: igw.ref
    })

    //Create public nacls
    const publicNetworkNalcs = createNACLs(this, `ACL-Public-${vpcConfig.vpcName}`, vpc, publicSubnetNACLs)
    //Create private nacls
    const privateNetworkNalcs = createNACLs(this, `ACL-Private-${vpcConfig.vpcName}`, vpc, privateSubnetNACLs)
    //Create public nacls
    const dataNetworkNalcs = createNACLs(this, `ACL-Data-${vpcConfig.vpcName}`, vpc, dataSubnetNACLs)


    //Create public route table
    const publicRouteTable = new ec2.CfnRouteTable(this, 'PublicSubnetRouteTable', {
      vpcId: vpc.vpcId
    })

    //and add route to iwg for PublicRoute table
    new ec2.CfnRoute(this, 'PublicRoute', {
      routeTableId: publicRouteTable.ref,
      gatewayId: igw.ref,
      destinationCidrBlock: '0.0.0.0/0'
    })
    Tags.of(publicRouteTable).add("Name", `RT-${vpcConfig.vpcName}-PUBLIC`)

    //Create data route table
    //Private route tables will be created in createPublicSubnet function since they need a route to nat gateways, and nat gateways will be created when created public subnets
    const dataRouteTable = new ec2.CfnRouteTable(this, 'dataSubnetRouteTable', {
      vpcId: vpc.vpcId
    })
    Tags.of(dataRouteTable).add("Name", `RT-${vpcConfig.vpcName}-DATA`)

    //Create public subnets and nat gateways
    //We have to separate public/private/data subnet here because the private will depend on the NAT gateway created in create Public subnets step
    //Update map listNATGateway using AZ
    let listNATGateway = new Map<string, ec2.CfnNatGateway>()
    //waitNATGateways is for handling race condition
    const waitNATGateways = (): boolean => {
      vpcConfig.publicSubnets.forEach((subnetConfig) => {
        createPublicSubnet(this, vpc.vpcId, vpcConfig.vpcName, subnetConfig, publicRouteTable, listNATGateway, publicNetworkNalcs)
      })
      return true
    }

    //Create private subnets 
    if (waitNATGateways()) {
      vpcConfig.privateSubnets.forEach((subnetConfig) => {
        createPrivateSubnet(this, vpc.vpcId, vpcConfig.vpcName, subnetConfig, listNATGateway, privateNetworkNalcs)
      })
    }

    //Create data subnets
    vpcConfig.dataSubnets.forEach((subnetConfig) => {
      createDataSubnet(this, vpc.vpcId, vpcConfig.vpcName, subnetConfig, dataRouteTable, dataNetworkNalcs)
    })
  }  
}