# Dashboard!

## How to execute

>docker-compose build
>docker-compose up

Then go on google and type :
http://localhost:8080

## About.json

```javascript
{ " client ":
	{ " host ": "10.101.53.35" } ,
" server ":
	{ " current_time ": 1531680780 ,
	" services ": [
		{
		" name ": " weather " ,
		" widgets ": [
			{
			" name ": " city_temperature " ,
			" description ": " Affichage de la temperature pour une ville " ,
			" params ": [
				{
				" name ": " city " ,
				" type ": " string "
				}]
			}]
		} ,
		{
		" name ": " rss " ,
		" widgets ": [
			{
			" name ": " article_list " ,
			" description ": " Affichage de la liste des derniers articles " ,
			" params ": [
				{
				" name ": " link " ,
				" type ": " string "
				}
				{
				" name ": " number " ,
				" type ": " integer "
				}
			] }
		] }
	] }
}
```

## Services

- Meteo
	> place: *String*
	> daysToAff: *Number*
- Crypto
	>btc: *Boolean*
	>eth: *Boolean*
	>ltc: *Boolean*
	>xmr: *Boolean*
	>xrp: *Boolean*
	>zec: *Boolean*
- steamNews
	>maxCount: *Number*
	>maxLenght: *Number*
- Nasa
	>displayPicture: *Boolean*
	>maxLenght: *Number*
- Twitter
	>displayProfile: *Boolean*
	>displayTweets: *Boolean*
	>displayTrends: *Boolean*


## Database organisation

const  **userSchema**  =  new  Schema({
>username:  *String*,
googleID:  *String*,
accessTokenGoogle:  *String*,
services: *{ type:  Schema.Types.ObjectId, ref:  'services' }*

const  **meteoSchema**  =  new  Schema({
>isActive:  *Boolean*,
place:  *String*,
daysToAff:  *Number*

const  **cryptoSchema**  =  new  Schema({
>isActive:  *Boolean*,
btc:  *Boolean*,
eth:  *Boolean*,
ltc:  *Boolean*,
xmr:  *Boolean*,
xrp:  *Boolean*,
zec:  *Boolean*

const  **steamNewsSchema**  =  new  Schema({
>isActive:  *Boolean*,
appId:  *Number*,
maxCount:  *Number*,
maxLenght:  *Number*

const  **nasaSchema**  =  new  Schema({
>isActive:  *Boolean*,
displayPicture:  *Boolean*,
maxLenght:  *Number*

const  **twitterSchema**  =  new  Schema({
>isActive:  *Boolean*,
displayProfile:  *Boolean*,
displayTweets:  *Boolean*,
displayTrends:  *Boolean*,

## About Page /profile

All services that are chosen by user are requested on the following route:
> /services/{name of the service}

Every service is update after Timer duration.
