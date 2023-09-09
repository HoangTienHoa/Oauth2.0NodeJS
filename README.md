# Oauth2.0NodeJS
OAuth2.0 allows to authenticate users using third party services like Google, Facebook and GitHub.

# Run Project
    npm i
    npm start
# Information
````
OAuth là từ ghép của O (Open) và Auth tượng trưng cho:
Authentication: xác thực người dùng.
Authorization: cấp quyền truy cập đến tài nguyên mà người dùng hiện đang nắm giữ.
OAuth2 là bản nâng cấp của OAuth1.0, là một giao thức chứng thực cho phép các ứng dụng chia sẻ một phần tài nguyên với nhau mà không cần xác thực qua username và password.
````

# Gibhub
````
# Register
        #0 Register a new OAuth application
            https://github.com/settings/applications/new

		#1 Authorizing OAuth apps Steps by steps
			https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

# Code
		#2 Authentication and get code. Access this link via browser to get CODE
				GET https://github.com/login/oauth/authorize?client_id=02f2fcbcf5060af02128
				Respone:
					http://localhost:3000/githubRedirect?code=ae4040e551c27f0045b9
		#3 Redirect and get access code
				POST: https://github.com/login/oauth/access_token?client_id=02f2fcbcf5060af02128&client_secret=0fba355528f3c433d30ea004cce3fe0f3bc2f5c8&code=ae4040e551c27f0045b9
				Response:
				{
				    "access_token": "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",
				    "token_type": "bearer",
				    "scope": ""
				}
		#4 Get user information
				GET: https://api.github.com/user
				Bearer Token: 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

				Response:
					{
				    "login": "HoangTienHoa",
				    "id": 10197536,
				    "node_id": "MDQ6VXNlcjEwMTk3NTM2",
				    "avatar_url": "https://avatars.githubusercontent.com/u/10197536?v=4",
				    "gravatar_id": "",
				    "url": "https://api.github.com/users/HoangTienHoa",
				    "html_url": "https://github.com/HoangTienHoa",
				    "followers_url": "https://api.github.com/users/HoangTienHoa/followers",
				    "following_url": "https://api.github.com/users/HoangTienHoa/following{/other_user}",
				    "gists_url": "https://api.github.com/users/HoangTienHoa/gists{/gist_id}",
				    "starred_url": "https://api.github.com/users/HoangTienHoa/starred{/owner}{/repo}",
				    "subscriptions_url": "https://api.github.com/users/HoangTienHoa/subscriptions",
				    "organizations_url": "https://api.github.com/users/HoangTienHoa/orgs",
				    "repos_url": "https://api.github.com/users/HoangTienHoa/repos",
				    "events_url": "https://api.github.com/users/HoangTienHoa/events{/privacy}",
				    "received_events_url": "https://api.github.com/users/HoangTienHoa/received_events",
				    "type": "User",
				    "site_admin": false,
				    "name": "Hoa Hoang",
				    "company": null,
				    "blog": "",
				    "location": null,
				    "email": null,
				    "hireable": null,
				    "bio": null,
				    "twitter_username": null,
				    "public_repos": 12,
				    "public_gists": 0,
				    "followers": 0,
				    "following": 2,
				    "created_at": "2014-12-15T16:03:47Z",
				    "updated_at": "2023-08-26T08:19:42Z"
				}
		#5 Ref:
			https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
			https://github.com/danba340/oauth-github-example
			https://www.youtube.com/watch?v=qTsqpYz5cGE&t=502s
````
# Google
````
# Register
    Register a new OAuth application
    https://console.cloud.google.com/apis/dashboard?project=testoauth-397107
# Response data
        {
        id: '100656561075519770031',
        displayName: 'Hoa Hoang',
        name: { familyName: 'Hoang', givenName: 'Hoa' },
        emails: [ { value: 'ht.hoa.0603@gmail.com', verified: true } ],
        photos: [
        {
        value: 'https://lh3.googleusercontent.com/a/ACg8ocJPOfvf3csRReImO4Q4cTw7t0ro25q-00lXaZtFYIDS7Gw=s96-c'
        }
        ],
        provider: 'google',
        _raw: '{\n' +
        '  "sub": "100656561075519770031",\n' +
        '  "name": "Hoa Hoang",\n' +
        '  "given_name": "Hoa",\n' +
        '  "family_name": "Hoang",\n' +
        '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocJPOfvf3csRReImO4Q4cTw7t0ro25q-00lXaZtFYIDS7Gw\\u003ds96-c",\n' +
        '  "email": "ht.hoa.0603@gmail.com",\n' +
        '  "email_verified": true,\n' +
        '  "locale": "en"\n' +
        '}',
        _json: {
        sub: '100656561075519770031',
        name: 'Hoa Hoang',
        given_name: 'Hoa',
        family_name: 'Hoang',
        picture: 'https://lh3.googleusercontent.com/a/ACg8ocJPOfvf3csRReImO4Q4cTw7t0ro25q-00lXaZtFYIDS7Gw=s96-c',
        email: 'ht.hoa.0603@gmail.com',
        email_verified: true,
        locale: 'en'
        }
        }

#Code
	https://www.loginradius.com/blog/engineering/google-authentication-with-nodejs-and-passportjs/

````

# Facebook
````
# Register
    #1 Register a new OAuth application
    https://developers.facebook.com/apps/

# Code
	#2 Cách 1: Lấy trực tiếp access token
	GET 
		https://www.facebook.com/v17.0/dialog/oauth?client_id=312083254664235&redirect_uri=http://localhost:3000/facebookRedirect&response_type=token

	Response: 
		http://localhost:3000/facebookRedirect?#access_token=EAAEb1ouI3CsBOx8cqaYgO0kwtm7hbpNgcZBSO6lXvvPiV1ubW8jAuctWWBK0onFpxVL4qjNyRmFZBFGBu3w4eVp3ZATBDfIm6x1c2cTmAQLBZAwZCW7QHl7rjFySKWv7a12UVz2vKrb0fyUn7wFtfWJMpgpGw4v6GQJ7K91lbB0GAGhwjYypLDnwGvi19jYSwRO13YLD1HffXfgyE&data_access_expiration_time=1701178619&expires_in=4981
	#3 Cách 2: Get code first, then Exchanging Code for an Access Token

 		+ GET
 			https://www.facebook.com/v17.0/dialog/oauth?client_id=312083254664235&redirect_uri=http://localhost:3000/facebookRedirect
 			Response:
 				http://localhost:3000/facebookRedirect?code=AQDa7YzEqCFvEX-93V89EK3IbuiB18_bZZNew0j_ZMsMfT_8JPziNcjbehaZ01mrL3_m643hx2v0zZB-4Qyl30aBoCuXczVtTcA5mGcmTGW1SiCj2jkmwkzmGIiC7Ddocx747RnWfuSpa7ZAAhi-w2doC1vkNvcMO6rllwglZLMGwxXnGZzeeepw79wMS6sGk9mZCbgUwehVf1z_LwakFcoDxNinyL0pJ6QY8uFtvtTtmj0VbbfYKr5q4CE3NYLZtpC8C4fy3vATtyiSCjpiEbyJkOko2iNClqclWi6UqXx4Gy3h7ULZRsiTReTgnnfVU65jvex1290qO1rT5URaGPqpf21ivB26_4-NSeFB4s89fATenVTDXp8pYZSyvN9UpytxkxRzhHcXrtK94KZJLAIEgkws37lxvRXoVEnM0zIjGg#_=_
 		+ GET
 			https://graph.facebook.com/v17.0/oauth/access_token?client_id=312083254664235&redirect_uri=http://localhost:3000/facebookRedirect&client_secret=dca02932340f42e29801b88d7cd3e489&code=AQDa7YzEqCFvEX-93V89EK3IbuiB18_bZZNew0j_ZMsMfT_8JPziNcjbehaZ01mrL3_m643hx2v0zZB-4Qyl30aBoCuXczVtTcA5mGcmTGW1SiCj2jkmwkzmGIiC7Ddocx747RnWfuSpa7ZAAhi-w2doC1vkNvcMO6rllwglZLMGwxXnGZzeeepw79wMS6sGk9mZCbgUwehVf1z_LwakFcoDxNinyL0pJ6QY8uFtvtTtmj0VbbfYKr5q4CE3NYLZtpC8C4fy3vATtyiSCjpiEbyJkOko2iNClqclWi6UqXx4Gy3h7ULZRsiTReTgnnfVU65jvex1290qO1rT5URaGPqpf21ivB26_4-NSeFB4s89fATenVTDXp8pYZSyvN9UpytxkxRzhHcXrtK94KZJLAIEgkws37lxvRXoVEnM0zIjGg%23_=_

 			Response:
 			{
			    "access_token": "EAAEb1ouI3CsBO3TyAUB6eqm2EC8rY3j3B4qqNadwx4vyzPi0UHz4wU42rtPEaLXOUDWyqjzZB7sXpRktCvGLlrTjE2TePSEPOlQ0oFir0ran42d3F7ZCntZBs6ZBFl7MU1Fa9c6m92GnYxLmF4L2lpFtwKtlfnHBuTJ9Ya9EUoIdUHvFKBPw726VL4Jb2XOy99W51tWwLn27aA4eEeXr9ZAgW30yiAOn7xesSzskKlgZBtZAXuA",
			    "token_type": "bearer",
			    "expires_in": 5136961
			}
	#4 Get information of a access token
		GET https://graph.facebook.com/debug_token?input_token=EAAEb1ouI3CsBO6tIEZCU9PZAbvHQvWdAeWejPRdZCjZCr6ZB0iNXVNv8AYqRKwZARgp0mZCEfnOpKFdU8gAXZANk0mcSmciVxD5YWf1CbYgwMWJQy5qs6unzPZC9nOzaAqNAoAWbv9sELEXwy8IHYZBOEVq1keXTPZBkFUY9ExkWKBPDwwMPdWSxvZBu3ZAGDULYLs7ydR3rOfAMWaNjLeB4j&access_token=EAAEb1ouI3CsBO6tIEZCU9PZAbvHQvWdAeWejPRdZCjZCr6ZB0iNXVNv8AYqRKwZARgp0mZCEfnOpKFdU8gAXZANk0mcSmciVxD5YWf1CbYgwMWJQy5qs6unzPZC9nOzaAqNAoAWbv9sELEXwy8IHYZBOEVq1keXTPZBkFUY9ExkWKBPDwwMPdWSxvZBu3ZAGDULYLs7ydR3rOfAMWaNjLeB4j

		Response:
			{
			    "data": {
			        "app_id": "312083254664235",
			        "type": "USER",
			        "application": "TestOauth",
			        "data_access_expires_at": 1701177861,
			        "expires_at": 1693407600,
			        "is_valid": true,
			        "scopes": [
			            "public_profile"
			        ],
			        "user_id": "6801045783286074"
			    }
			}

	#5 Ref Should read this document below before start implement:
		https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow
		https://medium.com/@jackrobertscott/facebook-auth-with-node-js-c4bb90d03fc0
		https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
````
# Ref
````
    https://www.loginradius.com/blog/engineering/google-authentication-with-nodejs-and-passportjs/
    https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
````