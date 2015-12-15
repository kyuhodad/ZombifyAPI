# Zombie TranslAPI
#### By Kyeong Hwi Lee (https://github.com/kyuhodad/ZombifyAPI)


This project provides a server which providing two APIs, zombify and unzombify. The server is running on port 7000.

-------------------------------------------------------------------------

## ZombifyAPI

### GET zombify

Returns zombified string of given string through the parameter `q`.

If parameter `q` is not provided, it returns an instruction showing how to define it.

#### Parameter
> **q** : String to translate into Zombie. The limit of string length is 1000.

#### Returns
>   **JSON data** : `{"result": translated string}`

#### Example
> **Url**: [`http://localhost:7000/zombify`](http://localhost:7000/zombify)

> **Output** : `{"result":"","message":"Empty string requested. Use '/zombify?q=string to translate' format."}`

> **Url**: [`http://localhost:7000/zombify?q=Hello Zombie World!!`](http://localhost:7000/zombify?q=Hello Zombie World!!)

> **Output** : `{"result":"HrrllrrrRr ZrrrRrmbrrRrrr wRwrrrRrRRld!!"}`

-------------------------------------------------------------------------

### GET unzombify

Returns un-zombified string of given string through the parameter `q`.

If parameter `q` is not provided, it returns an instruction showing how to define it.

#### Parameter
> **q** : String to translate back into English. The limit of string length is 1000.

#### Returns
>   **JSON data** : `{"result": translated string}`

#### Example
> **Url**: [`http://localhost:7000/unzombify`](http://localhost:7000/unzombify)

> **Output** : `{"result":"","message":"Empty string requested. Use '/unzombify?q=string to translate' format."}`

> **Url**: [`http://localhost:7000/unzombify?q=HrrllrrrRr ZrrrRrmbrrRrrr wRwrrrRrRRld!!`](http://localhost:7000/unzombify?q=HrrllrrrRr ZrrrRrmbrrRrrr wRwrrrRrRRld!!)

> **Output** : `{"result":"Hello Zombie world!!"}`
