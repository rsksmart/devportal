# Rootstock Contribution Guide

Are you passionate about web3, bitcoin and the Blockchain? Do you have a passion for Open Source and Web3? Do you enjoy writing, coding, bounty hunting, solving real-world problems, and eager to contribute to the future of Bitcoin and Decentralized Finance? Join the [Rootstock Discord Community](http://discord.gg/rootstock) and start making contributions!

All contributions are welcome, including issues, updates and tweaks, blog posts, workshops, and more.

## How to Contribute
If you are worried or don’t know where to start, check out the next section that explains what kind of help we could use and where you can get involved. 

You can send your questions on [Discord](http://discord.gg/rootstock), send a [Pull Request](https://github.com/rsksmart/devportal/pulls) or [Submit an Issue](https://github.com/rsksmart/devportal/issues/new/choose), and a maintainer will attend to it.

### Reporting Bugs

1. **Check for Existing Issues**: Before reporting a bug, please check the [issue tracker](https://github.com/rsksmart/devportal/issues/) to see if it has already been reported.
2. **Create a New Issue**: If your issue is not listed, create a new one. Provide as much detail as possible:
    - A clear and descriptive title.
    - Steps to reproduce the bug.
    - Expected and actual results.
    - Any relevant screenshots or logs.
    - Your environment details (OS, browser, version, etc.).

### Suggesting Features

1. **Check for Existing Requests**: Look through the [issue tracker](https://github.com/rsksmart/devportal/issues/) to see if someone else has suggested the feature.
2. **Create a New Feature Request**: If the feature is not listed, open a new issue. Include:
    - A clear and descriptive title.
    - The motivation for the feature.
    - Detailed description of the proposed feature.
    - Any relevant mockups or screenshots.

### Setup From Source

1. **Fork the Repository**: Fork the repo to your GitHub account.
2. **Clone Your Fork**: Clone your fork to your local machine.
    ```bash
    git clone https://github.com/rsksmart/devportal.git
    ```
3. **Create a Branch**: Create a new branch for your work.
    ```bash
    git checkout -b feature-branch
    ```

#### Development Environment Setup

1. **Install Dependencies**: Install the necessary dependencies for the project.
    ```bash
    yarn install
    ```
2. **Run the Project**: Ensure everything is working by running the project.
    ```bash
    yarn start
    ```

### Submitting a Pull Requests 🚀

Branch naming convention is as follows:

`AREA-ISSUE_ID-DESCRIPTION`

**Example:**

`doc-001-submit-a-pull-request-section-to-contribution-guide`

When `AREA` can be:

- feat \- a new feature  
- doc \- documentation only changes  
- fix \- a bug fix  
- refactor \- code change that neither fixes a bug nor adds a feature

All PRs must include a commit message with the description of the changes made\!

### **Writing Commit Messages**

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

### Documentation Standards

1. **Follow the Style Guide**: Adhere to our coding standards.
2. **Test**: Ensure your docs is working. by using this command `yarn build`
3. **Locate docs folder:**  Our documentation files are located in the `/docs` directory of the repository. After cloning the repo, navigate to this directory to see the existing documentation structure.

### Review Process

1. **Code Review**: Your PR will be reviewed by our maintainers. They may ask for changes or provide feedback.
2. **Make Necessary Changes**: Address any feedback and update your PR.
3. **Merge**: Once approved, your PR will be merged into the main branch.

### Community and Communication

1. **Join the Discussion**: Participate in discussions and If you need help, reach out to the team on [discord](http://discord.gg/rootstock).
2. **Stay Updated**: Follow Rootstock updates on [social media](https://x.com/rootstock_io).

### License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Related Docs  
- See [Rootstock Style_Guide](STYLE-GUIDE.md)
- See guide on how to contribute to the [Rootstock Documentation](CONTRIBUTING_DOCS.md)
- See the contribute page on the [Docs](https://dev.rootstock.io/resources/contribute/) for other ways to contribute to Rootstock.

Thank you for contributing to Rootstock!