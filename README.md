# Bruno Documentation - Mintlify

This is the migrated Bruno documentation using Mintlify.

## Development

### Prerequisites

- Node.js v20.17.0 or higher
- npm or pnpm

### Installation

Install the Mintlify CLI globally:

```bash
npm i -g mint
```

### Local Development

Run the documentation locally:

```bash
mint dev
```

Your documentation will be available at `http://localhost:3000`.

### Structure

- `/introduction` - Getting started with Bruno
- `/get-started` - Getting started guide
- `/send-requests` - Sending requests documentation
- `/variables` - Variables documentation
- `/git-integration` - Git integration guides
- `/testing` - Tests and scripts documentation
- `/secrets-management` - Secret management guides
- `/auth` - Authentication and authorization
- `/api-docs` - API documentation creation
- `/open-api` - OpenAPI integration
- `/bru-cli` - Bruno CLI documentation
- `/bru-lang` - Bru language specification
- `/converters` - Converter tools
- `/vs-code-extension` - VS Code extension
- `/license-management` - License management guides
- `/advanced-guides` - Advanced guides

## Migration from Nextra

This documentation was migrated from Nextra to Mintlify. Key changes:

1. Navigation structure converted from `_meta.js` files to `mint.json`
2. Nextra components converted to Mintlify components
3. Images moved to appropriate directories
4. Custom components adapted for Mintlify

## Deployment

This documentation can be deployed through:
- Mintlify Dashboard (automatic deployment on push)
- GitHub Integration
- Custom domain setup

## Support

For issues or questions:
- [Bruno GitHub](https://github.com/usebruno/bruno)
- [Bruno Docs GitHub](https://github.com/usebruno/bruno-docs)
- [Discord Community](https://discord.com/invite/KgcZUncpjq)

