# MDX CMS

An open-source MDX CMS for building modern content websites, blogs, and documentation portals.

![Screenshot from 2025-05-03 23-45-42](https://github.com/user-attachments/assets/7565a53d-9b83-42d7-84ba-614884bd9bc0)

## 🚀 Features

- **Fully customizable MDX content system**
- **Next.js-powered frontend and backend**
- **MongoDB database integration**
- **Turborepo monorepo setup for optimal development**
- **Astro-powered documentation**
- **Easy to extend and customize**
- **Content API for headless use cases**
- **SEO optimized out of the box**

## 📦 Monorepo Structure

```
lets-code/
├── apps/
│   ├── web/             # Next.js main application
│   ├── docs/            # Astro documentation site
│
├── packages/
│   ├── database-config  # Database config
│   ├── types-config     # Types config
│   ├── eslint-config    # Eslint config
│   └── config/          # Shared configuration
```

## 🛠️ Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API routes
- **Containization**: Docker
- **Database**: MongoDB
- **Documentation**: Astro
- **Build System**: Turborepo
- **Content**: MDX
- **Styling**: Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm v8 or later
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/lets-code.git
cd lets-code
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Copy the example environment files and adjust them to your needs:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

4. Start the development server:

```bash
pnpm dev
```

5. Run with Docker

```
docker build \
  --build-arg "DB_URI=DB URL" \
  --build-arg "NODE_ENV=production" \
  -f Dockerfile.web \
  -t my-web-app .


docker run -p 3000:3000 -e DB_URI=DB URL my-web-app

```

This will start all applications in development mode using Turborepo.

## 📝 Usage

### Creating Content

1. Navigate to the admin dashboard at `http://localhost:3001`
2. Log in with your credentials
3. Create a new page or post using the MDX editor
4. Publish your content

### Customizing Templates

1. Navigate to `apps/web/src/templates`
2. Modify existing templates or create new ones
3. Apply templates to your content in the admin dashboard

### Building Your Own Site

1. Copy the `examples/blog-starter` directory
2. Customize the configuration in `site.config.js`
3. Add your own components and styles
4. Deploy to your hosting provider of choice

## 📚 Documentation

For full documentation, visit the docs site at:

```
http://localhost:4172
```

Or check the `docs` directory for markdown documentation.

## 🤝 Contributing

We welcome contributions to lets code! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [MDX](https://mdxjs.com/)
- [Turborepo](https://turbo.build/)
- [Astro](https://astro.build/)

---

Built with ❤️ by the lets code team
