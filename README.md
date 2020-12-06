# Mogul Management
---
SAGE Management is the application use by advisors and advising coordinators to manage relationships between advisors
and students. This information then goes through the
[SAGE ETL application](https://bitbucket.org/ugaportal/starfish-airflow/src/master/) to be uploaded to
[SAGE](https://sage.uga.edu).

[TOC]

## Git Etiquette
---
We should try to maintain a clean project history and consistent git log by adhering to these principles:

Follow the [seven rules to writing good commit messages](https://chris.beams.io/posts/git-commit/#seven-rules)

1. Separate subject from body with a blank line.
2. Limit the subject line to 50 characters.
3. Capitalize the subject line.
4. Do not end subject line with period.
5. Use the imperative mood in the subject line.
6. Wrap body at 72 characters.
7. Use the body to explain *what* and *why* vs. *how*.

Use [atomic commits](https://www.freshconsulting.com/atomic-commits/)

- Commit each fix or task as separate change.
- Only commit when a block of work is complete.
- Commit each layout change separately.
- Joint commit for layout file, code behind file, and additional resources.

### Workflow
---
This project employs the [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
The short of it is that the `master` branch is treated as release ready and any new changes should be branched from
`dev`, worked on on its own branch, then merged back into the `dev`.

Use the [AVH edition](https://github.com/petervanderdoes/gitflow-avh) of `git flow`. This is currently being maintained 
and offers additional commands.

## Documentation
---
Documentation can be generated using [Sphinx](http://www.sphinx-doc.org/en/master/). The READMEs included in the repo 
provide overviews of the project to help you get started. See the docs for more in depth discussions.

1. `cd` into the `docs` folder and run `make html`. This will generate the docs.
2. Open `docs/build/html/index.html` in your browser of choice to view some [pretty docs](https://youtu.be/gflkvVk8Q3U).

**NOTE:** Use `make.bat` if you're on Windows. Bitbucket is able render reStructedText (`.rst`) to view online 
however this is not 100% perfect and most internal links will not work.

# Development Stack
---
SAGE - Management is a React frontend powered by a RESTful Python backend.

## Frontend
- [React](https://reactjs.org/)
- [reactstrap](https://reactstrap.github.io/)
- [React Table](https://github.com/tannerlinsley/react-table)
- [match-sorter](https://github.com/kentcdodds/match-sorter)
- [Request-Promise](https://github.com/request/request-promise#readme)
- [React Autosuggest](https://github.com/moroshko/react-autosuggest)
- [React Router](https://reacttraining.com/react-router/)
- [React Redux](https://react-redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) for async work
- [ESLint](https://eslint.org/) for static analysis & code style

See the [package.json](package.json) for a complete list.

## Backend
- [Python 3](https://www.python.org/)
- [Flask](http://flask.pocoo.org/) with the following extensions:
    - [Flask-Uploads](https://pythonhosted.org/Flask-Uploads/)
    - [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/)
    - [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/en/latest/)
- [Pylint](https://pylint.readthedocs.io/en/latest/index.html) for static analysis & code style
- [python-dotenv](https://github.com/theskumar/python-dotenv)
- [Pytest](https://docs.pytest.org/en/latest/)
- [jsonschema](https://python-jsonschema.readthedocs.io/en/stable/) for validating request/response JSON
- Microsoft SQL

See the [pip requirements file](requirements.txt) for a complete list

# Getting Started
---
1. Clone the repo: `git clone git@bitbucket.org:ugaportal/sage-mgmtv2.git`.
1. Create `.env` file in the project root. This file is included in [gitignore](.gitignore#lines-97) and should never
 be checked into VC.
1. Set the following required variables:

        REACT_APP_ENV # possible values are DEV, STAGE, PROD, TEST. Use to load config module defaults & set CAS URL
        SECRET_KEY    # 64 bytes base-64 encoded string. Use by Flask to sign tokens, cookies, etc...
        DEV_SUBJECT   # user to impersonate. Use in place of CAS validation. Required if running in dev mode.
        SQLALCHEMY_DATABASE_URI # format mssql+pymssql:username:password@server:port/database
        STARFISH_DATABASE_URI # URI for the Starfish staging DB
    
    `SECRET_KEY` can be obtained by running:

        python -c 'import base64, os; print(base64.urlsafe_b64encode(os.urandom(64)).decode("utf-8"))'

Any variables that will be consumed by React needs to be prefixed with `REACT_APP_` otherwise it will be completely
ignored when running `npm start, npm run build, etc...`.
See [here](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) for more info on 
setting custom environment variables for React.

See the [config module](Config.py) for a complete list of supported configuration options.

## Frontend
1. If you don't already have it you'll need to install [node](https://nodejs.org/en/).
1. Run `npm install` to install all dependencies for the project.
1. Run `npm start` to start the Webpack development server. This will open a window/tab in your 
default browser to SAGE Management on [localhost:3000](http://127.0.0.1:3000). The browser will automatically reload 
as you make changes.

This project uses `create-react-app` default settings. If, at anytime it's determined this setup does not meet 
the project's need you can [eject](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject).

## Backend
1. Create a [Python virtual environment](https://docs.python.org/3.7/tutorial/venv.html#creating-virtual-environments)
in the project root.
1. Install the required Python packages using [pip](https://pip.pypa.io/en/stable/installing/):

        pip install -r requirements.txt

1. Set the following environment variables:

    |Variable     |Description                       |Value                                                  |
    |-------------|-------------                     |-----                                                 :|
    |FLASK_ENV    |environment Flask is running in   |`development` or `production`. Defaults to `production`|
    |FLASK_APP    |path to sagemgmt package          |`path/to/sage-mgmtv2/sagemgmt`                         |

    [`FLASK_ENV`](http://flask.pocoo.org/docs/1.0/config/#ENV) - Flask and its extensions will change behaviors based 
    on this and may not behave as expected if set in code.

1. Issue `flask run` in the project root to start the Flask app. The app is served on [localhost:5000](
http://127.0.0.1:5000). You should see a generic 404 page.

**Note:** make sure you're connected to the restricted VPN.

# API Tokens
---
The backend regulates access to protected resources using signed [JSON Web Tokens](https://jwt.io/introduction/) (JWT).
All incoming requests must have an Authorization header with an issued token otherwise they're met with a `401` response
 code.

Tokens are granted by "logging" into the API: A user is redirected to `sagemgmt...uga.edu/login` after successfully 
authenticating through CAS. In the redirect URL is their server ticket.
[We validate this ticket against CAS](./sagemgmt/apis/Auth.py#lines-102). If the service ticket is valid CAS replies 
with their user id that is then use to generate a token. The [Login action](./src/store/actions/actions.js)
has the client side code.

Tokens are generated for users with active SAGE account (`is_active = True`) and have been granted access to SAGE - 
Management (`is_staff = True`).

Upon "logging" into the API you'll get back the following JSON (shorten for brevity):
```JSON
{
  "token": "eyJ0eXAiOiJKV1QiL.eyJpYXQiGl0eSI6InR5cGUiOiJhY2Nl.nqrNwXX0EMsysTSta3qIJnD_DMNKRtYZB3PeG9oVHyz_nAOUzvcUUD_A"
}
```

A request should be made to the API logout endpoint when the user logs out of SAGE - Management so their token is
black-listed: `DELETE /logout`. Expired tokens are revoked.

See the [Auth module](./sagemgmt/apis/Auth.py) for all things backend authentication.

## Dev Token
When developing on your local machine set `DEV_SUBJECT` to the MyID of the user you want a token generated for in 
your `.env` file. Just make sure the user is in the database you're connecting to.

When Flask is running in development mode (and only in development mode) `DEV_SUBJECT` is use instead of trying to
validate against CAS.

# Application Logs
---
The Flask backend maintains an application log when deploy to production. The file is simply named `FLASK.log` and can be found in the `instance` folder. Log level is set to [`DEBUG`](https://goo.gl/Nv9Qrw) - so everything is captured. Log records are formatted `[DATE TIME LEVEL in MODULE.FUNC():LINE]: MESSAGE`.

Here's a snippet of what a production log looks like:
```
[10/20/2018 07:56AM INFO in __init__.create_app():68]:
 Registering Blueprints
[10/20/2018 07:56AM INFO in __init__.create_app():78]:
 Initializing database
[10/20/2018 07:56AM INFO in __init__.create_app():80]:
 Configuring uploads folder
[10/20/2018 07:56AM INFO in __init__.create_app():83]:
 Starting app
 .
 .
 .
[10/20/2018 08:02AM DEBUG in UsersAPI.api_create():402]:
 The JSON with user info isn't provided. Cannot create a new user without their info. Aborting request
[10/20/2018 08:05AM ERROR in app.log_exception():1761]:
 Exception on /api/v2/users/verify/123456789 [GET]
Traceback (most recent call last):
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/app.py", line 2292, in wsgi_app
    response = self.full_dispatch_request()
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/app.py", line 1815, in full_dispatch_request
    rv = self.handle_user_exception(e)
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/app.py", line 1718, in handle_user_exception
    reraise(exc_type, exc_value, tb)
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/_compat.py", line 35, in reraise
    raise value
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/app.py", line 1813, in full_dispatch_request
    rv = self.dispatch_request()
  File "/Users/prince/Documents/sage-mgmtv2/env/lib/python3.7/site-packages/flask/app.py", line 1799, in dispatch_request
    return self.view_functions[rule.endpoint](**req.view_args)
  File "/Users/prince/Documents/sage-mgmtv2/sagemgmt/apis/UsersAPI.py", line 214, in verify_user
    myid = user['ugaIDNum']
TypeError: 'NoneType' object is not subscriptable
```

In addition to `FLASK.log` the `instance` folder also contains Gunicorn access, error logs as well as Supervisord logs.
