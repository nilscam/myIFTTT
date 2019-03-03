// add this file to .gitignore

module.exports = {
	mongodb: {
        dbURL: 'mongodb://root:epitech42@ds261088.mlab.com:61088/area'
	},
  nasa: {
		api_key: "4UTvkS80md4NTgLKJLFTRo9g5XMnFCpqXi7BPJQr"
  },
  twitter: {
		consumer_key: 'QArew40ucYgJXhW5nR3oahSKP',
		consumer_secret: 'V9gRG60aIiyKwBiorNSF6mNJ3oJ2gN9Ac0wgdvI7Ta5fV0AmsI',
		access_token_key: '501852948-U590JzV9q2IKTCMthytiimVRYfvNxGM88gYw6LAx',
		access_token_secret: 'kxG6oGjoWE010wgor7mOZEa2zqtkr5Kjc0JB0rrWYXM4X'
	},
	jwtSecret: "werkfdzxcvbnm",
	nodemailer: {
		mail: 'areaproject13@gmail.com',
		passMail: 'Epitechproject13'
	},
	office365: {
		APP_ID: 'e8dc47f8-badc-4cf9-b8c2-fdcb81210e13',
		APP_PASSWORD: 'czpRZVC021}!-khjfKBB04]',
		APP_SCOPES: 'openid profile User.Read Mail.Read',
		REDIRECT_URI: 'http://localhost:3000/authorize_user',
	}
}
