# Computational Thinking Learning App - Replit.md

## Overview

This is an interactive educational web application designed to teach computational thinking concepts to Indonesian high school students (SMA). The app focuses on four core computational thinking pillars: decomposition, pattern recognition, abstraction, and algorithmic thinking. It features a modular architecture with interactive learning modules, progress tracking, and offline functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built with vanilla HTML5, CSS3, and JavaScript ES6+ classes
- **No Framework Dependencies**: Uses lightweight libraries (Tailwind CSS, Feather Icons) via CDN
- **Modular Design**: Organized into separate JavaScript modules for each computational thinking concept
- **Responsive Design**: Mobile-first approach using Tailwind CSS utility classes
- **Progressive Web App Ready**: Structured for offline functionality with localStorage

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+ Classes)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Feather Icons (CDN)
- **Storage**: Browser localStorage for offline data persistence
- **No Backend Required**: Fully client-side application

## Key Components

### 1. Core Application Controller (`js/app.js`)
- **Purpose**: Main application orchestrator managing navigation and state
- **Key Features**: 
  - Navigation management between sections
  - Grade and topic selection handling
  - Progress tracking coordination
  - Question flow management

### 2. Educational Content System (`js/data/content.js`)
- **Purpose**: Centralized content repository for all learning materials
- **Structure**: Hierarchical organization by grade → topic → questions
- **Content Types**: Multiple choice, interactive modules, practical exercises
- **Localization**: All content in Indonesian language (Bahasa Indonesia)

### 3. Interactive Learning Modules
Each computational thinking concept has its own specialized module:

#### Decomposition Module (`js/modules/decomposition.js`)
- **Problem Breakdown**: Interactive problem decomposition exercises
- **Step Ordering**: Drag-and-drop sequence arrangement activities
- **Real-world Applications**: Contextual examples from daily life

#### Pattern Recognition Module (`js/modules/pattern.js`)
- **Sequence Patterns**: Number and text sequence completion
- **Visual Patterns**: Shape and color pattern recognition
- **Mathematical Patterns**: Algebraic and geometric sequences

#### Abstraction Module (`js/modules/abstraction.js`)
- **Information Filtering**: Relevant vs irrelevant information identification
- **Key Details Extraction**: Essential information highlighting
- **Categorization**: Grouping and classification exercises

#### Algorithm Design Module (`js/modules/algorithm.js`)
- **Flowchart Builder**: Drag-and-drop flowchart construction
- **Pseudocode Creation**: Step-by-step algorithm writing
- **Step Sequencing**: Logical order arrangement

### 4. Progress Tracking System (`js/modules/progress.js`)
- **Individual Question Progress**: Tracks completion and correctness
- **Topic Progress**: Calculates completion percentages per topic
- **Grade Progress**: Overall progress across all topics
- **Persistent Storage**: Uses localStorage for offline progress retention

### 5. Utility Systems
#### Storage Utility (`js/utils/storage.js`)
- **Offline Data Management**: localStorage wrapper with error handling
- **Data Persistence**: User progress and preferences storage
- **Version Management**: App version tracking and migration support

#### Shuffle Utility (`js/utils/shuffle.js`)
- **Randomization**: Fisher-Yates algorithm implementation
- **Question Randomization**: Prevents pattern memorization
- **Option Shuffling**: Dynamic content presentation

## Data Flow

### Navigation Flow
1. User selects navigation option (Home/Materi/Progress)
2. App controller switches active section
3. Relevant content loads based on selection
4. UI updates with appropriate navigation highlighting

### Learning Flow
1. User selects grade level (X, XI, XII)
2. System displays available topics for selected grade
3. User chooses specific topic (decomposition, pattern, etc.)
4. Module-specific question loader initializes
5. Interactive content renders based on question type
6. User responses are validated and feedback provided
7. Progress is automatically saved to localStorage

### Progress Tracking Flow
1. Each question completion triggers progress update
2. Individual question status stored with timestamp
3. Topic progress calculated as completion percentage
4. Grade progress aggregated from all topic progress
5. Visual progress indicators updated in real-time

## External Dependencies

### CDN Dependencies
- **Tailwind CSS**: `https://cdn.tailwindcss.com` - Utility-first CSS framework
- **Feather Icons**: `https://unpkg.com/feather-icons` - Lightweight icon library

### No Backend Dependencies
- **Fully Client-Side**: No server-side processing required
- **No Database**: All data stored in browser localStorage
- **No Authentication**: Simple educational tool without user accounts

## Deployment Strategy

### Static Site Deployment
- **Deployment Type**: Static file hosting
- **Requirements**: Any web server capable of serving static files
- **Recommended Platforms**: GitHub Pages, Netlify, Vercel, or simple HTTP server
- **No Build Process**: Direct deployment of source files

### Offline Functionality
- **Local Storage**: All progress and preferences stored locally
- **No Network Dependency**: App functions completely offline after initial load
- **Progressive Enhancement**: Designed to work on low-end devices and slow connections

### Performance Considerations
- **Lightweight**: Minimal external dependencies
- **Fast Loading**: CDN-based external resources
- **Mobile Optimized**: Responsive design for various screen sizes
- **Browser Compatibility**: Modern browser features with graceful degradation

### Future Extensibility
- **Modular Architecture**: Easy to add new computational thinking modules
- **Content Expansion**: Simple JSON-based content system for adding new questions
- **Grade Level Scaling**: Structure supports additional grade levels
- **Language Support**: Architecture ready for multi-language content