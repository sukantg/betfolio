# OpenAI API Setup for AI Weight Optimization

## 🚀 Quick Setup

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### 2. Add API Key to Environment Variables

Create a `.env.local` file in your project root:

```bash
# Create the file
touch .env.local
```

Add your OpenAI API key to `.env.local`:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
# Then restart
npm run dev
# or
pnpm dev
```

## 🔧 Configuration Options

You can customize the AI behavior by adding these optional variables to `.env.local`:

```env
# Required
OPENAI_API_KEY=sk-your-actual-api-key-here

# Optional: Change the AI model
OPENAI_MODEL=gpt-4o-mini

# Optional: Adjust creativity (0.0 = deterministic, 1.0 = very creative)
OPENAI_TEMPERATURE=0.3

# Optional: Limit response length
OPENAI_MAX_TOKENS=1000
```

## 🧪 Testing the Integration

1. Go to your betfolio builder page
2. Add 2 or more markets to your betfolio
3. Click "Optimize with AI" button
4. You should see AI-optimized weights applied

## 🚨 Troubleshooting

### Error: "OpenAI API key not configured"
- Make sure you created `.env.local` file
- Check that the API key is correct
- Restart your development server

### Error: "OpenAI API error: 401"
- Your API key is invalid or expired
- Get a new API key from OpenAI Platform

### Error: "OpenAI API error: 429"
- You've hit the rate limit
- Wait a moment and try again
- Consider upgrading your OpenAI plan

### Error: "Invalid AI response format"
- The AI returned an unexpected response
- This is rare but can happen
- Try again or check the console for details

## 💰 Cost Considerations

- **GPT-4o-mini**: Very affordable (~$0.15 per 1M input tokens)
- **Typical cost**: Less than $0.01 per optimization
- **Free tier**: $5 credit for new accounts

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your API key secret
- Consider using environment-specific keys for production

## 📊 What the AI Does

The AI analyzes your selected markets and:

1. **Evaluates Risk**: Higher odds = higher risk = lower weight
2. **Considers Liquidity**: More liquidity = more confidence = higher weight
3. **Diversifies**: Spreads risk across different categories
4. **Applies Kelly Criterion**: Optimal bet sizing based on expected value
5. **Provides Reasoning**: Explains the allocation strategy

## 🎯 Expected Results

You should see:
- Optimized weight percentages that sum to 100%
- Expected value percentage
- Confidence score (0-1)
- Brief explanation of the strategy
- Success toast notification
