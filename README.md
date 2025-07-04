# Paddle Billing React Native App

A complete React Native starter kit for Paddle Billing subscription management, built with Expo and TypeScript.

## Features

- 🔐 **Authentication** - User signup/signin with Supabase
- 💳 **Subscription Management** - View and manage subscriptions
- 💰 **Pricing Plans** - Dynamic pricing with monthly/annual billing
- 📱 **Cross-Platform** - Works on iOS and Android
- 🎨 **Modern UI** - Clean, dark theme design
- 🔄 **Real-time Updates** - Live subscription status via webhooks
- 🚀 **Production Ready** - Built with best practices and scalability in mind

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Paddle Billing
- **Navigation**: Expo Router
- **State Management**: React Context + Hooks
- **Styling**: React Native StyleSheet with TypeScript

## Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- [Supabase account](https://supabase.com)
- [Paddle Billing account](https://paddle.com)

## Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd paddle-react-native-starter
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

3. **Database Setup**:
   - Create a new Supabase project
   - Run the included migration to create required tables:
     ```sql
     -- See supabase/migrations/20240907140223_initialize.sql
     ```
   - Enable Row Level Security (RLS) policies

4. **Paddle Setup**:
   - Create products and prices in your Paddle dashboard
   - Set up your products and prices
   - Update the price IDs in `src/constants/PricingTiers.ts`
   - Configure webhook endpoints pointing to your backend

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

## Building for Production

### iOS
```bash
npm run build:ios
npm run submit:ios
```

### Android
```bash
npm run build:android
npm run submit:android
```

## Project Structure

```
├── app/                    # App Router pages
│   ├── auth/              # Authentication screens
│   ├── dashboard/         # Dashboard screens
│   ├── pricing.tsx        # Pricing screen
│   └── index.tsx          # Home screen
├── src/
│   ├── components/        # Shared UI components
│   ├── constants/         # App constants
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and configurations
│   ├── providers/        # Context providers
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
├── supabase/             # Database migrations
└── assets/               # Static assets (icons, images)
```

## Key Features

### Authentication
- Secure email/password authentication
- Secure session management
- Protected routes

### Subscription Management
- Real-time subscription status
- Subscription status tracking
- Payment history
- Subscription management (cancel, update)

### Pricing
- Dynamic pricing with Paddle integration
- Monthly/annual billing options
- Featured plan highlighting
- Mobile-optimized pricing cards

### Dashboard
- Comprehensive account overview
- Quick access to key features
- Real-time data updates
- Usage statistics

## Paddle Integration

This app integrates with Paddle Billing for:

- **Checkout**: Secure payment processing
- **Subscription Lifecycle**: Create, update, cancel subscriptions
- **Payment Processing**: Secure payment handling
- **Webhooks**: Real-time subscription status updates
- **Pricing**: Dynamic pricing with localization support

### Webhook Setup

Configure webhooks in your Paddle dashboard to point to your backend:
- `subscription.created` - New subscription events
- `subscription.updated` - Subscription changes
- `customer.created` - New customer events
- `customer.updated` - Customer profile changes

## Mobile-Specific Considerations

### Paddle Integration
This starter kit includes a placeholder Paddle provider. For production:

1. **Native SDK**: Integrate Paddle's React Native SDK when available
2. **WebView Checkout**: Use WebView for Paddle's web checkout
3. **Deep Linking**: Handle post-checkout redirects via deep links
4. **Platform Differences**: Handle iOS/Android payment flow differences

### Performance
- Optimized for mobile performance
- Efficient state management
- Minimal re-renders
- Fast navigation transitions

### User Experience
- Native mobile UI patterns
- Touch-friendly interface
- Responsive design for all screen sizes
- Offline-first approach where possible

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `EXPO_PUBLIC_PADDLE_ENV` | Paddle environment (`sandbox` or `production`) | Yes |
| `EXPO_PUBLIC_PADDLE_CLIENT_TOKEN` | Paddle client-side token | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test on both iOS and Android
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **iOS build failures**: Ensure Xcode is up to date
3. **Android build issues**: Check Android SDK configuration
4. **Supabase connection**: Verify environment variables are set correctly

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review [Supabase guides](https://supabase.com/docs)
- Consult [Paddle developer docs](https://developer.paddle.com/)

## License

This project is licensed under the MIT License.

## Support

For support with:
- **Paddle Billing**: [Paddle Support](https://paddle.com/support)
- **Supabase**: [Supabase Documentation](https://supabase.com/docs)
- **Expo**: [Expo Documentation](https://docs.expo.dev/)
- **This Project**: [Open an issue](https://github.com/your-repo/issues)