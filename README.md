<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/adamtaylor13/hoop">
    <img src="https://github.com/adamtaylor13/hoop/blob/master/images/logo.svg" alt="Logo" width="300" height="150">
    <!-- Generated using artifical intelligence at: https://creator.nightcafe.studio -->
  </a>

<h3 align="center">Hoop</h3>
  <p align="center">
    Hoop is a lightweight CLI for seeing your current project's Circle CI status
    <!-- 
    <a href="https://github.com/adamtaylor13/hoop">View Demo</a>
    ·
    <a href="https://github.com/adamtaylor13/hoop/issues">Report Bug</a>
    ·
    <a href="https://github.com/adamtaylor13/hoop/issues">Request Feature</a>
    -->
  </p>
</div>


## About The Project

![Example Output](https://github.com/adamtaylor13/hoop/blob/master/images/example_output.png)


This CLI has a simple purpose: Cleanly and concisely display the status of the configured project's branch in Circle CI

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Typescript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/en/)
    * [Axios](https://axios-http.com/docs/intro)

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

### Prerequisites

You'll just need yarn in order to install dependencies and run the script. Feel free to use
npm instead, but I haven't tested anything with npm.
```sh
npm install --global yarn
```
or for OSX
```shell
brew install yarn
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adamtaylor13/hoop.git
   ```
2. Install yarn packages
   ```sh
   yarn install
   ```
3. Fill out the .env file with pertinent info
   ```sh
    CIRCLE_API_TOKEN=token
    REPO_PATH=path/to/your/repo/hosted/on/circle
    PROJECT_SLUG=github/my-project
    WORKFLOW_NAME=workflow_to_isolate
   ```
   
`CIRCLE_API_TOKEN`: This is the API token used to communicate with Circle CI

`REPO_PATH`: The absolute path on your local machine, to the repository you want to track on Circle CI.

`PROJECT_SLUG`: The slug used by Circle to uniquely identify your project's pipelines and workflows. It will be part
of the URL.

`WORKFLOW_NAME`: The workflow to track in Circle. Eventually this may support tracking the entire pipeline for each commit,
but for now my use-case is only watching a specific workflow (the "testing" workflow) and watching that every individual
test job succeeds within that specific workflow.

<p align="right">(<a href="#top">back to top</a>)</p>



## Usage

To run the project, simply run `yarn start`, and `Ctrl-C` when you wish to end the loop.
In the future, there may be support to define when the loop should end, but for now
it's for monitoring, and to that end, there's no reason for it.

The goal behind this project is to easily monitor your CircleCI pipeline's status as you push 
/ modify your branch.

### Comand line arguments

`--pipelineIndex=N`

This arg defines some index (`N`) to look backwards for pipelines. For example, if you're running your current pipeline,
but want to see which tests failed on the previous pipeline's run, you can run:

```shell
yarn start --pipelineIndex=1
```

This will run the 2nd most recent pipeline.

### Tips & Tricks

You can further extend this by leveraging a bash script to access this script from any location on your system. For example,
I use the following function source'd into my bash_profile:

```shell
function hoop() {
    startingPath=$(pwd)
    debug "Starting at: ${startingPath}"
    cd ~/path/to/hoop
    yarn start --pipelineIndex="${1}"
    debug "Navigating back to ${startingPath}"
    cd "${startingPath}"
}
```

<p align="right">(<a href="#top">back to top</a>)</p>



## Roadmap

- [x] Add tests
  - 100% Test Coverage Goal
- [ ] Use Blessed in order to provide a more beautified experience
- [ ] Provide better error messaging & recovery options
- [ ] Allow this package to be installed / run globally so that it can work for any given repo without additional configuration

<p align="right">(<a href="#top">back to top</a>)</p>

