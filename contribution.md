## Open Source Contribution Guide

Welcome to Rootstock! 

We're excited to have you contribute to Rootstock Open Source Projects. This guide will help you understand the contribution process and ensure contributors have clear guidelines and procedures for how to contribute.

All contributions are welcome, including issues, updates and tweaks, tutorials and more.

### Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Features](#suggesting-features)
    - [Contributing Code](#contributing-code)
        - [Development Environment Setup](#development-environment-setup)
        - [Coding Standards](#coding-standards)
        - [Commit Messages](#commit-messages)
        - [Submitting Pull Requests](#submitting-pull-requests)
3. [Review Process](#review-process)
4. [Community and Communication](#community-and-communication)
5. [License](#license)

### Code of Conduct

Please read our [Code of Conduct]() before contributing. We are committed to fostering a welcoming and inclusive community.

### How to Contribute

#### Reporting Bugs

1. **Check for Existing Issues**: Before reporting a bug, please check the [issue tracker](https://github.com/rsksmart/rsksmart.github.io/issues) to see if it has already been reported.
2. **Create a New Issue**: If your issue is not listed, create a new one. Provide as much detail as possible:
    - A clear and descriptive title.
    - Steps to reproduce the bug.
    - Expected and actual results.
    - Any relevant screenshots or logs.
    - Your environment details (OS, browser, version, etc.).

#### Suggesting Features

1. **Check for Existing Requests**: Look through the [issue tracker](issues) to see if someone else has suggested the feature.
2. **Create a New Feature Request**: If the feature is not listed, open a new issue. Include:
    - A clear and descriptive title.
    - The motivation for the feature.
    - Detailed description of the proposed feature.
    - Any relevant mockups or screenshots.

#### Contributing

1. **Fork the Repository**: Fork our repo to your GitHub account.
2. **Clone Your Fork**: Clone your fork to your local machine.
    ```bash
    git clone https://github.com/rsksmart/devportal.git
    ```
3. **Create a Branch**: Create a new branch for your work.
    ```bash
    git checkout -b feature-branch
    ```

##### Development Environment Setup

1. **Install Dependencies**: Install the necessary dependencies for the project.
    ```bash
    npm install
    ```
2. **Run the Project**: Ensure everything is working by running the project.
    ```bash
    yarn start
    ```

##### Documentation Standards

1. **Follow the Style Guide**: Adhere to our coding standards.
2. **Test**: Ensure your docs is working. by using this command `yarn build`
3. **Locate docs folder:**  Our documentation files are located in the `/docs` directory of the repository. After cloning the repo, navigate to this directory to see the existing documentation structure.

##### Submitting Pull Requests

1. **Push Your Branch**: Push your branch to your forked repository.
    ```bash
    git push origin feature-branch
    ```
Branch naming convention is as following

`AREA-ISSUE_ID-DESCRIPTION`

**Example:**

`doc-001-submit-a-pull-request-section-to-contribution-guide`

When `AREA` can be:

- feat \- add a new feature  
- doc \- update documentation  
- fix \- a bug fix or resolve na issue 
- refactor \- code change that neither fixes a bug nor adds a feature

2. **Open a Pull Request**: Navigate to our repository and open a pull request (PR).
    - Provide a clear description of the changes.
    - Link to any relevant issues.
    
All PRs must include a commit message with the description of the changes made\!

#### Writing Commit Messages

* Use clear and concise commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
* Use the present tense ("Add feature" not "Added feature")  
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")  
* Limit the first line to 72 characters or less  
* Consider starting the commit message with an applicable emoji:  
  * 🎨 :art: when improving the format/structure of the code  
  * 🐎 :racehorse: when improving performance  
  * 🚱 :non-potable\_water: when plugging memory leaks  
  * 📝 :memo: when writing docs  
  * 🐧 :penguin: when fixing something on Linux  
  * 🍎 :apple: when fixing something on macOS  
  * 🏁 :checkered\_flag: when fixing something on Windows  
  * 🐛 :bug: when fixing a bug  
  * 🔥 :fire: when removing code or files  
  * 💚 :green\_heart: when fixing the CI build  
  * ✅ :white\_check\_mark: when adding tests  
  * 🔒 :lock: when dealing with security  
  * ⬆️ :arrow\_up: when upgrading dependencies  
  * ⬇️ :arrow\_down: when downgrading dependencies  
  * 👕 :shirt: when removing linter warnings



### Review Process

1. **Code Review**: Your PR will be reviewed by our maintainers. They may ask for changes or provide feedback.
2. **Make Necessary Changes**: Address any feedback and update your PR.
3. **Merge**: Once approved, your PR will be merged into the main branch.

### Community and Communication

1. **Join the Discussion**: Participate in discussions and If you need help, reach out to us on [discord](http://discord.gg/rootstock).
2. **Stay Updated**: Follow our updates on [social media](https://x.com/rootstocklabs).

### License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to Rootstock!