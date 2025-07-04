# Paddle Billing React Native App

A React Native implementation of the Paddle Billing subscription management system, built with Expo and TypeScript.

## Features

- 🔐 **Authentication** - User signup/signin with Supabase
- 💳 **Subscription Management** - View and manage subscriptions
- 💰 **Pricing Plans** - Dynamic pricing with monthly/annual billing
- 📱 **Cross-Platform** - Works on iOS and Android
- 🎨 **Modern UI** - Clean, dark theme design
- 🔄 **Real-time Updates** - Live subscription status updates

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Paddle Billing
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet

## Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Supabase account
- Paddle Billing account

## Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd paddle-rn-app
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_PADDLE_ENV=sandbox
   EXPO_PUBLIC_PADDLE_CLIENT_TOKEN=your_paddle_client_token
   ```

3. **Supabase Setup**:
   - Create a new Supabase project
   - Run the migration from the original Next.js project to create the required tables
   - Update your environment variables with the Supabase credentials

4. **Paddle Setup**:
   - Create a Paddle Billing account
   - Set up your products and prices
   - Update the price IDs in `src/constants/PricingTiers.ts`
   - Configure webhook endpoints for subscription updates

## Development

Start the development server:

```bash
npm start
```

Run on specific platforms:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
├── app/                    # App Router pages
│   ├── auth/              # Authentication screens
│   ├── dashboard/         # Dashboard screens
│   ├── pricing.tsx        # Pricing page
│   └── index.tsx          # Home page
├── src/
│   ├── components/        # Reusable components
│   ├── constants/         # App constants
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and configurations
│   └── providers/        # Context providers
└── assets/               # Static assets
```

## Key Features

### Authentication
- Email/password authentication via Supabase
- Secure session management
- Protected routes

### Subscription Management
- View active subscriptions
- Subscription status tracking
- Payment history
- Cancel subscriptions

### Pricing
- Dynamic pricing from Paddle
- Monthly/annual billing options
- Featured plan highlighting
- Responsive pricing cards

### Dashboard
- Overview of account status
- Quick access to key features
- Real-time data updates

## Paddle Integration

This app integrates with Paddle Billing for:

- **Subscription Management**: Create, update, and cancel subscriptions
- **Payment Processing**: Secure payment handling
- **Webhook Processing**: Real-time subscription updates
- **Price Management**: Dynamic pricing and localization

### Webhook Setup

Configure webhooks in your Paddle dashboard to point to your backend:
- `subscription.created`
- `subscription.updated` 
- `customer.created`
- `customer.updated`

## Deployment

### iOS App Store

1. Build for production:
   ```bash
   eas build --platform ios
   ```

2. Submit to App Store:
   ```bash
   eas submit --platform ios
   ```

### Google Play Store

1. Build for production:
   ```bash
   eas build --platform android
   ```

2. Submit to Play Store:
   ```bash
   eas submit --platform android
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support with:
- **Paddle Billing**: Contact Paddle support
- **Supabase**: Check Supabase documentation
- **Expo**: Visit Expo documentation
- **This Project**: Open an issue on GitHub