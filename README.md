# Zombie TranslAPI
#### By Kyeong Hwi Lee (https://github.com/kyuhodad/ZombifyAPI)

This project provides a server which providing two APIs, zombify and unzombfy. The server is running on port 7000.

## ZombifyAPI

### GET zombify

Returns zombified string of given string through the parameter `q`.

#### Parameter
> **q** : String to translate into Zombie.
>>  The limit of string length is 1000.

#### Returns
>   Json data `{"result": translated string}`

### GET unzombify

Returns un-zombified string of given string through the parameter `q`.

#### Parameter
> **q** : String to translate back into English. 
>>  The limit of string length is 1000.

#### Returns
>   Json data `{"result": translated string}`
