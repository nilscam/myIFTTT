module.exports = {
	google: {
		clientID: '34526951253-nms32bsim1367e4p8nn9ls7236d4om7m.apps.googleusercontent.com',
		clientSecret: 'D4TsVpBvI7CDpG0Hz_KilNQp'
	},
  twitter: {
		consumer_key: 'QArew40ucYgJXhW5nR3oahSKP',
		consumer_secret: 'V9gRG60aIiyKwBiorNSF6mNJ3oJ2gN9Ac0wgdvI7Ta5fV0AmsI',
		access_token_key: '501852948-U590JzV9q2IKTCMthytiimVRYfvNxGM88gYw6LAx',
		access_token_secret: 'kxG6oGjoWE010wgor7mOZEa2zqtkr5Kjc0JB0rrWYXM4X'
	},
  nasa: {
		api_key: "4UTvkS80md4NTgLKJLFTRo9g5XMnFCpqXi7BPJQr"
  },
	instagramKey: {
		clientID: '228cd009e7284b4ab7a8e6154d001340',
		clientSecret: '4bc020f917d34b84a6378e45c4dd5f29',
		callbackURL: "http://localhost:3000/instagram/authorize_user"
	},
	facebook: {
		clientID: '434736193719299',
		clientSecret: '1229156084d4047775d607ae1bf7097f',
		callbackURL: 'http://localhost:3000/facebook/authorize_user',
	},
	office365: {
		clientID: 'e8dc47f8-badc-4cf9-b8c2-fdcb81210e13',
		clientSecret: 'czpRZVC021}!-khjfKBB04]',
		callbackURL: 'http://localhost:3000/office365/authorize_user',
		APP_SCOPES: 'openid profile User.Read Mail.Read',
	}
}
