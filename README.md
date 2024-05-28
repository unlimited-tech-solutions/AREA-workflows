# Repo status
- Still under construction, open to feedback!



# Creating a new project

### Steps 
0. create new repository by the naming convention, copy that name and use it for subsequent procesii
1. git clone https://github.com/unlimited-tech-solutions/unlimited-serverless-template.git
2. POWERSHELL: Rename-Item "unlimited-serverless-template" "NewClient-Serverless-DemoCard"
3. cd .\NewClient-Serverless-DemoCard\
4. git remote set-url origin https://github.com/unlimited-tech-solutions/NewClient-Serverless-DemoCard.git
5. git push origin



## Serverless Function/ Private App Gotchas: 

- Folder Structure: private apps and serverless functions must match Hubspot's desired structure or otherwise won't build
    - app.functions dir in src\app dir requires '.'
    - app.json, crm-card.json, serverless.json and hsproject.json are all required

- With Webhooks: payloads with multiple headers are filtered strangely through Hubspot in Serverless Functions
    - Headers that appear in Postman are sometimes not accessible in Hubspot CRM and require workaround to recieve properly

- Depending on the API, errors may need to be manually thrown after a catch block recieves them


- Sometimes routes in the Hubspot API documentation/ examples are wrong and won't work if you copy/paste

- Outputfields in Automated Workflows will stringify numbers and properties 

- Properties from webhook payloads on workflow webhook event triggers are not directly accessible to custom code blocks: 
    - properties can be made accessible with the format data workflow block (same page as custom code block)
    - properties can also be set to a record and retrieved via that record







# HubSpot Getting Started Project Template

This is the Getting Started project for HubSpot developer projects. It contains a private app, a CRM card written in React, and a serverless function that the CRM card is able to interact with. This code is intended to help developers get up and running with developer projects quickly and easily.

## Requirements

There are a few things that must be set up before you can make use of this getting started project.

- You must have an active HubSpot account.
- You must have the [HubSpot CLI](https://www.npmjs.com/package/@hubspot/cli) installed and set up.
- You must have access to developer projects (developer projects are currently [in public beta under "CRM Development Tools"](https://app.hubspot.com/l/whats-new/betas)).

## Usage

The HubSpot CLI enables you to run this project locally so that you may test and iterate quickly. Getting started is simple, just run this HubSpot CLI command in your project directory and follow the prompts:

`hs project dev`
