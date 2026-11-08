# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and blogs
COPY . .

# Build the Astro site
RUN npm run build

# Prune devDependencies to keep image lean
RUN npm prune --omit=dev

# Stage 2: Production runner
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copy runtime assets and dependencies from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Run as non-privileged node user for security
USER node

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
