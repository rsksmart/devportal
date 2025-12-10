# GitHub App Setup for Changelog Page

The Changelog page (`/changelog`) fetches release data from multiple GitHub repositories using the GitHub REST API.  What you need to do here is configure your own repository so it can push updates to the Devportal using the GitHub App.

## Overview

_From your repository:_

1. A GitHub Actions workflow is triggered on an Approval event.
2. The workflow:
- Generates a GitHub App installation token.
- Clones the rsksmart/devportal repository using that token.
- Transforms your local file(s) into the format/layout expected by the Devportal.
-- Commits and pushes a branch to rsksmart/devportal.
-- Creates a Pull Request in rsksmart/devportal.
3. Once the PR is merged, the Devportal `/changelog` page reflects the new content.

Everything is done through the GitHub App.

## Prerequisites
The GitHub App must be installed in rsksmart and have access to:
* DevPortal repository (target)
* Your repository (source)

## Setup Instructions

### 1. What You Must Configure to Allow the GitHub App to Push Changelog Updates

#### Add the App Credentials as GitHub Actions Secrets

In the repo running the workflow add:

**Required Secrets:**
| Secret                   | Value                                 |
| ------------------------ | ------------------------------------- |
| `GH_APP_ID`              | The App ID                            |
| `GH_APP_PRIVATE_KEY`     | The content of the private key `.pem` |
| `GH_APP_INSTALLATION_ID` | Installation ID for the repository    |

These are consumed by your GitHub Actions workflow.

_Disclaimer: Create a ticket for the security team in order to fill in the values for the required secrets._

### 2. How the Workflow Uses the GitHub App Token

Your workflow needs to include:

```bash
# Step 1: Generate GitHub App Token
  - name: Generate GitHub App Token
    id: generate_token
    uses: actions/create-github-app-token@31c86eb3b33c9b601a1f60f98dcbfd1d70f379b4 # v1.10.3
    with:
      app-id: ${{ secrets.GH_APP_ID }}
      private-key: ${{ secrets.GH_APP_PRIVATE_KEY }}
      owner: rsksmart
      repositories: devportal

# Step 2: Clone the Devportal Repository
  - name: Clone Devportal Repository
    run: |
      TIMESTAMP=$(date +'%Y%m%d-%H%M%S')
      BRANCH_NAME="update-from-foundry-starter-${TIMESTAMP}"
      echo "BRANCH_NAME=${BRANCH_NAME}" >> $GITHUB_ENV

      git clone https://x-access-token:${{ steps.generate_token.outputs.token }}@github.com/rsksmart/devportal.git
      cd devportal
      git checkout -b ${BRANCH_NAME} || git checkout ${BRANCH_NAME}
      cd ..
```

Step 1 automatically generates an installation token with the correct permissions and Step 2 uses it.

The workflow then:

- clones the repository using x-access-token:<token>
- pushes commits
- creates pull requests via GitHub API

### 2. Configure the Environment Variable

#### For Local Development

Create or update your `.env.local` file in the project root:

```bash
GH_APP_ID=your_app_id
GH_APP_PRIVATE_KEY="your_private_key_contents"
GH_APP_INSTALLATION_ID=your_installation_id
```

#### For Production Deployment

Set the environment variable in your deployment platform:

**Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `GH_APP_ID`
   - `GH_APP_PRIVATE_KEY`
   - `GH_APP_INSTALLATION_ID`

**Netlify:**
1. Go to Site settings > Environment variables
2. Add:
   - `GH_APP_ID`
   - `GH_APP_PRIVATE_KEY`
   - `GH_APP_INSTALLATION_ID`

**Other platforms:**
Follow your platform's documentation for setting environment variables.

### 3. Restart the Development Server

After adding the environment variable locally:

```bash
yarn start
```

## Verification

1. Navigate to `/changelog` page
2. If configured correctly, you should see live GitHub release data
3. If not configured, you'll see a message: "Using sample data due to GitHub API rate limits. Add a GitHub token for live data."

## Security Notes

- **Never commit the private key (.pem) to version control**
- The `.env.local` file is already in `.gitignore`
- Restrict repository access during GitHub App installation
- Rotate tokens periodically for security
- Installation tokens generated from the app are short-lived (1 hour), increasing security

## Troubleshooting

### Still seeing sample data after setup?

1. Verify the environment variable names:
   - `GH_APP_ID`
   - `GH_APP_PRIVATE_KEY`
   - `GH_APP_INSTALLATION_ID`
2. Restart your development server completely
3. Check browser console for any API errors
4. Try the quick testing method above
5. Ensure the app is installed on the correct GitHub organization or repositories
6. Confirm the private key is correctly formatted
  

### Rate limiting issues?

- Confirm the GitHub App is being used and token generation is working
- Check that you're not making excessive requests
- Consider implementing caching for production use

## Repositories Monitored

The changelog page fetches data from these Rootstock repositories:

- `rsksmart/rskj` (RSKj)
- `rsksmart/rsk-cli` (Rootstock CLI)
- `rsksmart/rsk-explorer-api` (Rootstock Explorer)
- `rsksmart/2wp-app` (Two Way Peg App)
- `rsksmart/rbtc-faucet` (Faucet)
- `rsksmart/powpeg-node` (PowPeg node)

All repositories are public and don't require special permissions.

## API Configuration

The changelog page uses the following GitHub API configuration:

- **API Version**: `2022-11-28` (specified via `X-GitHub-Api-Version` header)
- **Releases per Repository**: 30 releases fetched per repository
- **Total Requests**: 6 repositories × 1 request each = 6 API requests per page load
- **Rate Limit Impact**: With authentication, this uses only 6 out of 5,000 hourly requests

## Enhanced Features

The changelog page includes several enhanced features:

- **Smart Link Parsing**: Automatically converts plain URLs in release descriptions to clickable links
- **New Tab Links**: All links in release descriptions open in new tabs for better user experience
- **MDX Rendering**: Release descriptions support full markdown formatting
- **Responsive Design**: Optimized for all screen sizes with filtering and sorting capabilities
- **Infinite Scroll**: Loads more releases automatically as you scroll
- **Error Handling**: Graceful fallback to sample data when API limits are reached
