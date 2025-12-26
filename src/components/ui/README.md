# 🎨 UI Components Documentation

This directory contains reusable UI components that provide consistent styling and behavior across the application.

## 📁 Component Structure

```
src/components/ui/
├── Button.tsx          # Reusable button component
├── Input.tsx           # Reusable input component  
├── Label.tsx           # Reusable label component
├── PasswordInput.tsx   # Password input with show/hide toggle
├── index.ts            # Central export file
└── README.md          # This documentation
```

## 🧩 Available Components

### Button
A versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui'

// Basic usage
<Button onClick={handleClick}>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>

// With states
<Button loading={true}>Loading...</Button>
<Button disabled={true}>Disabled</Button>

// Form submission
<Button type="submit">Submit</Button>
```

### Input
A customizable input field for text, email, and other input types.

```tsx
import { Input } from '@/components/ui'

// Basic usage
<Input
  value={value}
  onChange={handleChange}
  placeholder="Enter text"
/>

// Email input
<Input
  type="email"
  value={email}
  onChange={handleEmailChange}
  placeholder="Enter email"
  required
/>

// With custom styling
<Input
  value={value}
  onChange={handleChange}
  className="w-full mb-4"
/>
```

### Label
An accessible label component for form fields.

```tsx
import { Label } from '@/components/ui'

// Basic usage
<Label htmlFor="email">Email Address</Label>

// Required field
<Label htmlFor="password" required>Password</Label>

// Different sizes
<Label size="small">Small Label</Label>
<Label size="large">Large Label</Label>

// Screen reader only
<Label htmlFor="search" srOnly>Search</Label>
```

### PasswordInput
A password input with built-in show/hide functionality.

```tsx
import { PasswordInput } from '@/components/ui'

// Basic usage
<PasswordInput
  value={password}
  onChange={handlePasswordChange}
  placeholder="Enter password"
/>

// Without toggle button
<PasswordInput
  value={password}
  onChange={handlePasswordChange}
  showToggle={false}
/>

// With custom styling
<PasswordInput
  value={password}
  onChange={handlePasswordChange}
  className="mb-4"
  required
/>
```

## 🎯 Design Principles

### Consistency
All components follow the same design patterns and use consistent styling classes.

### Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Reusability
- Flexible prop interfaces
- Customizable styling
- Composable components

### Hydration Safety
- Proper client-side mounting checks
- No hydration mismatches
- SSR compatibility

## 🔧 Usage Guidelines

### Import Patterns
```tsx
// Import individual components
import { Button, Input, Label } from '@/components/ui'

// Or import specific components
import Button from '@/components/ui/Button'
```

### Styling
Components use Tailwind CSS classes and can be extended with custom classes:

```tsx
<Button className="custom-class additional-styling">
  Custom Button
</Button>
```

### Form Integration
Components are designed to work seamlessly with forms:

```tsx
<form onSubmit={handleSubmit}>
  <Label htmlFor="email" required>Email</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={handleEmailChange}
    required
  />
  
  <Label htmlFor="password" required>Password</Label>
  <PasswordInput
    id="password"
    value={password}
    onChange={handlePasswordChange}
    required
  />
  
  <Button type="submit" loading={isLoading}>
    Submit
  </Button>
</form>
```

## 🚀 Best Practices

1. **Always use these components** instead of raw HTML elements for consistency
2. **Provide proper labels** for accessibility
3. **Use appropriate input types** (email, tel, etc.)
4. **Handle loading states** for better UX
5. **Validate inputs** before submission
6. **Follow naming conventions** for IDs and names

## 🔮 Future Enhancements

- [ ] Add more input types (textarea, select, etc.)
- [ ] Implement toast notifications
- [ ] Add form validation components
- [ ] Create compound components (FormField)
- [ ] Add theming support
- [ ] Implement size variants for all components

## 📝 Contributing

When adding new UI components:

1. Follow the established patterns
2. Add comprehensive TypeScript interfaces
3. Include accessibility features
4. Add detailed JSDoc comments
5. Update this documentation
6. Test for hydration safety