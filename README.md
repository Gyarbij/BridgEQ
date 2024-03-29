<p align="center">
    <img src="https://github.com/Gyarbij/BridgEQ/blob/main/images/mercedeseqhb_logo.png" height="200">
</p>


# BridgEQ
Homebridge control of Mercedes EQ vehicles based on hombridge-mercedes.


## Info

<img src="https://github.com/Gyarbij/BridgEQ/blob/main/images/homekit_mercedesme.gif" align="right" alt="Apple Home">

This dynamic platform plugin allows control of **Mercedes Me** capable vehicles. At the moment it is only possible to get information like vehicle status, lock status, fuel status etc. If in the future the possibility of e.g. locking or unlocking the car becomes possible, this will also be implemented.

Any system capable of running [Homebridge](https://github.com/nfarina/homebridge/) can be used to run **BridgEQ**. The only need is Mercedes Me capable car.



## Installation instructions

After [Homebridge](https://github.com/nfarina/homebridge) has been installed:

```sudo npm install -g homebridge-mercedesme@latest```



## First steps (obtain Client ID and Client Secret)

In order to use this plugin, you must first log in with your Mercedes Me account on [Mercedes Developer](https://developer.mercedes-benz.com). 
After logging in go to [Console](https://developer.mercedes-benz.com/console/) and press on **Add new app** if you dont have already an existing app for this plugin.

Enter **Application Name** (e.g. Homebridge) **Business Purposes** (e.g. homebridge-mercedesme) and press **Create**

Now we need to add the API endpoints to our App. 

1. Visit [Vehicle Status API](https://developer.mercedes-benz.com/products/vehicle_status) and press **Get access**. 
2. Choose **Bring your own car** and press **Next**
3. Choose **Standard** and press **Next**
4. Choose your existing app and press **Next**
5. On **Edit Application** leave everything as it is and press **Submit**

Congratulation. Now you have added the **Vehicle Status** endpoint to your app. You need also to add **Lock Status** endpoint, **Pay as your drive** endpoint, **Electric Vehicle Status** endpoint and **Fuel status** endpoint to your app by following the above steps. 

Requested endpoints:

- [x] [Vehicle Status](https://developer.mercedes-benz.com/products/vehicle_status/) (added above)
- [ ] [Lock Status](https://developer.mercedes-benz.com/products/vehicle_lock_status/)
- [ ] [Fuel Status](https://developer.mercedes-benz.com/products/fuel_status/)
- [ ] [Electric Vehicle Status](https://developer.mercedes-benz.com/products/electric_vehicle_status/)
- [ ] [Pay as you drive](https://developer.mercedes-benz.com/products/pay_as_you_drive_insurance/)

Once you have added all the API endpoints to your application, visit [Console](https://developer.mercedes-benz.com/console/) again. 
You should see your **Client ID**, **Client Secret** and **Redirect Url**. 

### Important
Add your Config UI X ip address with port as your **Redirect Url** (eg http://10.69.420.69:8080). If there multiple ip addresses in your config ui x, add all as **redirect uri's** !

Copy your **Client ID** and **Client Secret** and put it in your config.json (``Config UI > Plugins > Homebridge Mercedesme Settings > Client ID/Client Secret``)


## First start

The Version 2 is completely new designed. It supports [Config UI X Plugin UI Utils](https://github.com/homebridge/plugin-ui-utils) and is full integrated in your homebridge system via Config UI X. The custom config will guide you through the process! Generating or refreshing access token was never easier! Below you can see how easy it is to create, edit or delete a new car for the config.json using the custom user interface. To use the custom user interface you need at least **homebridge-config-ui-x v4.34.0**!

<img src="https://github.com/Gyarbij/BridgEQ/blob/beta/images/hb_mercedesme_ui.gif" align="center" alt="CustomUI">

 
## Configuration

Please setup your config in Config UI X under ```Plugins > BridgEQ > Settings.``` 
 
 
## Example config.json:

```
{
  "bridge": {
      ...
  },
  "platforms": [
    {
      "platform": "MercedesPlatform",
      "debug": false,
      "cars": [
        {
          "name": "Mercedes-AMG EQS 53 4MATIC+",
          "clientID": "1b851746-2x58-7y8r-6548-12ft58w159zu",
          "clientSecret": "d896ct55-c85c-6363-9999-25iu6985mo10",
          "vin": "W1KCG2DBXNA012292",
          "model": "AMG EQS 53",
          "manufacturer": "Mercedes-AMG",
          "maxRange": 685,
          "polling": 60,
          "electricVehicle": true,
          "tankBatteryType": "LIGHTBULB"
        },
        {
          "name": "Mercedes-Benz EQE 350+",
          "clientID": "1b851746-2x58-7y8r-6548-12ft58w159zu",
          "clientSecret": "d896ct55-c85c-6363-9999-25iu6985mo10",
          "vin": "W1K2951211F002060",
          "model": "EQE 350+",
          "manufacturer": "Mercedes-Benz",
          "maxRange": 644,
          "polling": 120,
          "electricVehicle": true,
          "tankBatteryType": "HUMIDITY"
        },
        {
          "name": "Mercedes-Benz C300e AMG Line Limited",
          "clientID": "1b851746-2x58-7y8r-6548-12ft58w159zu",
          "clientSecret": "d896ct55-c85c-6363-9999-25iu6985mo10",
          "vin": "WDD1234567N123456",
          "model": "Mercedes C300e",
          "manufacturer": "Mercedes",
          "maxRange": 700,
          "polling": 120,
          "hybridVehicle": true,
          "tankBatteryType": "HUMIDITY"
        }
      ]
    }
  ]
}
```
See [Example Config](https://github.com/Gyarbij/BridgEQ/blob/main/example-config.json) for more details.


### Settings

* `platform` - **required** : Must be 'MercedesPlatform'
* `vehicles.name` - **required** : Name of the Accessory (*unique*)
* `vehicles.clientID` - **required** : Client ID obtained from https://developer.mercedes-benz.com
* `vehicles.clientSecret` - **required** : Client Secret obtained from https://developer.mercedes-benz.com
* `vehicles.vin` - **required** : Vehicle Identification Number (VIN)
* `vehicles.manufacturer` - **not required** : Car Manufacturer
* `vehicles.model` - **not required** : Model of the car (Default: Mercedes)
* `vehicles.electricVehicle` - **not required** : Enable if your car is a electric vehicle (Default: true)
* `vehicles.hybridVehicle` - **not required** : Enable if your car is a hybrid vehicle (Default: false)
* `vehicles.maxRange` - **not required** : Maximum distance after full tank load (for calculating range in % for battery state if API doesnt send the percentage) (Default: false)
* `vehicles.polling` - **not required** : Time in seconds for polling Mercedes API (Default: 60s)
* `vehicles.tankBatteryType` - **not required** : Choose between several accessory types (HUMIDITY | LIGHTBULB) to show the remaining range and/or hybrid vehicle battery and/or tank load value in percent


## Supported clients

This plugin has been verified to work with the following apps on iOS 14:

* Home Assistant
* Apple Home
* Homebridge >= v1.1.6

## TODO
- [ ] If it should be possible to control the doors in the future > Changing Door (Contact Service) to Door Service
- [ ] If it should be possible to control the windows in the future > Changing Window (Contact Service) to Window Service



## Troubleshooting

If you have any issues with the plugin, you can enable the debug mode, which will provide some additional information. This might be useful for debugging issues. Open your config.json and set ``"debug": true``

#### Token Issues

If you experiencing issues with your generated token, you can easily refresh it via Config UI X. Below you can see how to do it.

<img src="https://github.com/Gyarbij/BridgEQ/blob/main/images/hb_mercedesme_ui_refreshToken.gif" align="center" alt="CustomUI Refresh Token">


## Changelog

See the [changelog](https://github.com/Gyarbij/BridgEQ/blob/main/CHANGELOG.md) for changes between versions of this package.



## Contributing

You can contribute to this homebridge plugin in following ways:

- [Report issues](https://github.com/Gyarbij/BridgEQ/issues) and help verify fixes as they are checked in.
- Review the [source code changes](https://github.com/Gyarbij/BridgEQ/pulls).
- Contribute bug fixes.
- Contribute changes to extend the capabilities
- Pull requests are accepted.


## Disclaimer

All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
