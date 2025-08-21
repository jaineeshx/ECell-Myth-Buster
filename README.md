# ECell Wisdom Wednesday: Startup Myth Busters

## How to Update Weekly Myths

To update the myths displayed on the website, simply edit the `data/myths.ts` file:

### Adding New Myths

1. Open `data/myths.ts`
2. Add new myth objects to the `mythsDatabase` array
3. Update the `weeklySchedule` array with corresponding week information

### Myth Object Structure

\`\`\`typescript
{
  id: number,                    // Unique identifier
  myth: "Your myth text here",   // The myth statement
  reality: "Reality explanation", // The truth/reality
  icon: "🔥",                   // Emoji icon
  category: "Category Name",     // Category for the myth
  difficulty: "Beginner",        // Beginner, Intermediate, or Advanced
  dateAdded: "2024-01-15",      // Date added (YYYY-MM-DD)
  weekNumber: 1,                // Week number
  tags: ["tag1", "tag2"],       // Array of tags
  sources: ["Source 1"],        // Array of sources
}
\`\`\`

### Weekly Schedule Structure

\`\`\`typescript
{
  weekNumber: 1,
  startDate: "2024-01-15",      // Week start date
  endDate: "2024-01-21",        // Week end date
  featuredMyth: 1,              // ID of the featured myth
  theme: "Theme Name",          // Week theme
  description: "Description",    // Week description
}
\`\`\`

### Quick Update Guide

1. **To change current myths**: Edit the existing entries in `mythsDatabase`
2. **To add more myths**: Add new objects to the `mythsDatabase` array
3. **To update weekly schedule**: Modify the `weeklySchedule` array
4. **To change the current week**: Update the dates in `weeklySchedule`

The website will automatically update to reflect your changes!
