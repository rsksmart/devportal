# GitHub Token Setup for Changelog Page

The Changelog page (`/changelog`) fetches release data from multiple GitHub repositories using the GitHub REST API. To avoid rate limiting and ensure reliable access to live data, you need to configure a GitHub Personal Access Token.

## Why is this needed?

- **Rate Limits**: GitHub API has strict rate limits for unauthenticated requests (60 requests per hour)
- **Reliability**: Authenticated requests have much higher rate limits (5,000 requests per hour)
- **Production Use**: Essential for production deployment to ensure consistent data availability

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Rootstock DevPortal Changelog"
4. Set expiration as needed (recommend 1 year for production)
5. **No scopes required** - the token only needs public repository read access (default)
6. Click "Generate token"
7. **Copy the token immediately** - you won't be able to see it again

### 2. Configure the Environment Variable

#### For Local Development

Create or update your `.env.local` file in the project root:

```bash
GITHUB_TOKEN=your_github_token_here
```

#### For Production Deployment

Set the environment variable in your deployment platform:

**Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `GITHUB_TOKEN` = `your_token_here`

**Netlify:**
1. Go to Site settings > Environment variables
2. Add: `GITHUB_TOKEN` = `your_token_here`

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

- **Never commit tokens to version control**
- The `.env.local` file is already in `.gitignore`
- Use environment variables for all deployments
- Rotate tokens periodically for security
- The token only needs public repository access (no additional scopes)

## Troubleshooting

### Still seeing sample data after setup?

1. Verify the environment variable name is exactly: `GITHUB_TOKEN`
2. Restart your development server completely
3. Check browser console for any API errors
4. Try the quick testing method above
5. Verify the token is valid by testing it with a curl command:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user
```

### Rate limiting issues?

- Ensure the token is properly configured
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
