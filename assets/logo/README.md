# ECell Logo Assets

This folder contains the ECell logo assets for the Wisdom Wednesday website.

## How to Update the Logo

1. **Replace the placeholder logo** in the main page component
2. **Supported formats**: PNG, SVG, JPG
3. **Recommended size**: 40x40px for header, 32x32px for footer
4. **File naming**: Use `ecell-logo.svg` or `ecell-logo.png`

## Current Implementation

The logo is currently a placeholder using a simple "E" in a colored box. To replace:

1. Add your logo file to this folder
2. Update the logo component in `app/page.tsx`
3. Replace the placeholder div with an img tag pointing to your logo

Example:
\`\`\`tsx
<img 
  src="/assets/logo/ecell-logo.svg" 
  alt="ECell Logo" 
  className="w-10 h-10"
/>
\`\`\`

## Logo Animation

The logo includes a subtle entrance animation that can be customized in `app/globals.css` under the `.logo-entrance` class.
