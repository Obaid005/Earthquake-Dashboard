# Earthquake Dashboard

A Vue 3 + Quasar + TypeScript dashboard displaying real-time earthquake data from USGS using ECharts and OpenLayers.

## Features

- 📊 **Table View**: Display all earthquakes with filtering, sorting, and pagination. Click rows to view details in a drawer
- 📈 **Chart View**: Interactive ECharts line chart visualizing earthquake magnitude over time with zoom and export
- 🗺️ **Map View**: Interactive OpenLayers map with earthquake markers, click interactions, and zoom-to-earthquake functionality
- 🔍 **Advanced Filters**: Filter by magnitude range and location text with quick filter buttons
- 📱 **Fully Responsive**: Mobile-optimized with card-based table view and touch-friendly interactions
- 💾 **Persistent Filters**: Filters are saved to localStorage and restored on page reload
- 📤 **Data Export**: Export filtered earthquake data to CSV format
- ⏱️ **Auto-refresh**: Automatically refreshes earthquake data every 5 minutes
- 🎨 **Modern UI**: Clean, professional interface with loading indicators and error handling

## Tech Stack

- Vue 3 (Composition API)
- Quasar Framework
- TypeScript
- Pinia (State Management)
- Axios (HTTP Requests)
- ECharts (Data Visualization)
- OpenLayers (Map Visualization)

## Installation

Install dependencies using pnpm:

```bash
pnpm install
```

## Development

Start the app in development mode:

```bash
pnpm dev
# or
quasar dev
```

The app will open automatically in your browser at `http://localhost:9000` (or the next available port).

## Building for Production

Build the app for production:

```bash
pnpm build
# or
quasar build
```

## Code Quality

Lint the files:

```bash
pnpm lint
```

Format the files:

```bash
pnpm format
```

## Project Structure

```
src/
├── components/                    # Reusable Vue components
│   ├── EarthquakeTable.vue       # Main data table with row click functionality
│   ├── EarthquakeChart.vue       # ECharts visualization component
│   ├── EarthquakeMap.vue         # OpenLayers interactive map component
│   ├── EarthquakeFilters.vue     # Filter controls (magnitude, location)
│   ├── EarthquakeDetailsDrawer.vue # Side drawer for earthquake details
│   ├── StatisticsCards.vue       # Statistics cards (total, filtered, max, avg)
│   ├── ActiveFilterChips.vue     # Display and manage active filter chips
│   ├── InfoRow.vue               # Reusable info row component
│   ├── MapLegend.vue             # Map legend component
│   ├── MapPopup.vue              # Map marker popup component
│   ├── EssentialLink.vue         # Link component (Quasar example)
│   ├── ExampleComponent.vue      # Example component (Quasar template)
│   └── models.ts                 # Component model definitions
│
├── composables/                  # Vue 3 Composition API composables
│   ├── useIndexPage.ts           # Main page logic (export, watchers, lifecycle)
│   ├── useEarthquakeMap.ts       # Map interactions and feature management
│   ├── useEarthquakeFilters.ts   # Filter state management
│   ├── useEarthquakeTable.ts     # Table state and drawer management
│   ├── useEarthquakeDetailsDrawer.ts # Drawer logic and handlers
│   ├── useEarthquakeChart.ts     # Chart initialization and options
│   ├── useStatisticsCards.ts     # Statistics calculations
│   ├── useMapPopup.ts            # Map popup state management
│   └── useActiveFilterChips.ts   # Active filters computation
│
├── pages/                        # Page-level components
│   ├── IndexPage.vue             # Main dashboard page
│   └── ErrorNotFound.vue         # 404 error page
│
├── stores/                       # Pinia state management
│   ├── earthquake.ts             # Main earthquake data store
│   ├── example-store.ts          # Example store (Quasar template)
│   └── index.ts                  # Store exports
│
├── types/                        # TypeScript type definitions
│   ├── earthquake.ts             # Earthquake data types and interfaces
│   ├── components.ts             # Component prop types
│   └── map.ts                    # OpenLayers map-related types
│
├── utils/                        # Utility functions and helpers
│   ├── constants.ts              # Application constants (magnitude thresholds, colors, etc.)
│   ├── formatters.ts             # Data formatting utilities (numbers, time, relative time)
│   ├── magnitude.ts              # Magnitude-related calculations and color mapping
│   ├── validation.ts             # Validation utilities (coordinates, etc.)
│   ├── statistics.ts             # Statistics calculation functions
│   ├── export.ts                 # CSV export functionality
│   ├── chartConfig.ts            # ECharts configuration generator
│   └── tableColumns.ts           # Table column definitions
│
├── styles/                       # Component-specific styles (SCSS)
│   ├── indexPage.scss            # Dashboard page styles
│   ├── earthquakeCharts.scss     # Chart component styles
│   ├── earthquakeMap.scss        # Map component styles
│   ├── earthquakeTable.scss      # Table component styles
│   ├── earthquakeFilters.scss    # Filter component styles
│   ├── earthquakeDetailsDrawer.scss # Drawer component styles
│   ├── statisticsCards.scss      # Statistics cards styles
│   ├── mapLegend.scss            # Map legend styles
│   ├── mapPopup.scss             # Map popup styles
│   ├── mainLayout.scss           # Layout styles
│   ├── infoRow.scss              # Info row component styles
│   └── errorNotFound.scss        # 404 page styles
│
├── layouts/                      # Layout components
│   └── MainLayout.vue            # Main application layout with header
│
├── router/                       # Vue Router configuration
│   ├── index.ts                  # Router setup
│   └── routes.ts                 # Route definitions
│
├── boot/                         # Boot files (initialization)
│   ├── axios.ts                  # Axios HTTP client setup
│   └── vue3-openlayers.ts        # OpenLayers plugin initialization
│
├── css/                          # Global styles
│   ├── app.scss                  # Application styles
│   └── quasar.variables.scss     # Quasar theme variables
│
└── assets/                       # Static assets
    └── quasar-logo-vertical.svg  # Logo assets
```

### Key Features by Component

- **EarthquakeTable**: Displays earthquake data in a sortable, filterable table with mobile-responsive card view
- **EarthquakeChart**: Interactive ECharts line chart showing magnitude over time with zoom and export
- **EarthquakeMap**: OpenLayers map with earthquake markers, click interactions, and zoom-to-earthquake functionality
- **EarthquakeFilters**: Filter controls with quick filter buttons and localStorage persistence
- **EarthquakeDetailsDrawer**: Side drawer showing detailed earthquake information with "View on Map" action
- **StatisticsCards**: Dashboard statistics cards showing total, filtered, max, and average magnitude

## Architecture & Design Patterns

### State Management

- **Pinia Store**: Centralized state management for earthquake data, filters, and loading states
- **Reactive Filters**: All views (table, chart, map) automatically update when filters change
- **localStorage Persistence**: User filters are persisted across browser sessions

### Component Organization

- **Separation of Concerns**: Each component has a single responsibility
- **Composables Pattern**: Business logic extracted to composables for reusability and testability
- **Style Separation**: Component styles separated into dedicated SCSS files in `styles/` directory
- **Reusable Components**: InfoRow, StatisticsCards, ActiveFilterChips for code reusability
- **Utility Functions**: Business logic extracted to utility modules for maintainability

### Data Flow

1. **Store** fetches data from USGS API
2. **Filters** update store state (persisted to localStorage)
3. **Computed Properties** filter earthquakes reactively
4. **Components** (Table, Chart, Map) react to filtered data changes

### Integration Patterns

- **ECharts**: Chart configuration generated from utility function for consistency
- **OpenLayers**: Map features updated reactively when filtered data changes
- **Quasar Components**: Proper use of Quasar's responsive grid system and components

## Data Source

This dashboard fetches earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson), which provides real-time earthquake data for the last 7 days.

## Development Notes

- Uses Vue 3 Composition API with `<script setup>` syntax
- **Composables Pattern**: Component logic extracted to reusable composables in `composables/` directory
- **Style Organization**: Component styles separated into individual SCSS files in `styles/` directory
- TypeScript for type safety throughout the application
- Quasar's responsive utilities for mobile-first design
- Proper error handling and loading states
- Accessibility considerations with proper ARIA labels and semantic HTML

## License

MIT
