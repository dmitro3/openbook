# OpenBook

A 3 Actor based sportsbook involving bettors, odds providers and liquidity providers. This model incentivizes best odds allowing OpenBook to facilitate a wider variety of sports and individual games, higher limits, lower fees, and a smoother betting experience for bettors while introducing a new way to capture yields for the LPs.

## Getting Started
Create an .env file by copying .env-example and filling the values.

Start the hardhat node with:
> npx hardhat node


While that is running, deploy everything using:
> npm run build:hardhat

To bring the odds:
>npm run provider

The script will keep running to update odds but you can close it.

Then start the web server with:
> npm run dev

Then open browser and switch metamask network to localhost.

### Links
White paper: https://docs.openbook.bet/ <br />
Landing page: https://openbook.bet/ <br />
Live Deployment: https://app.openbook.bet/
