# Financial Transaction Genie

Financial Transaction Genie is a privacy-first React app for reviewing and editing personal transaction data from CSV files.

All parsing, validation, filtering, and table edits run in the browser so your data stays on your device.

## Features

- CSV upload using drag-and-drop or click-to-select
- Schema validation and normalization with Zod
- Row-level validation feedback for invalid rows
- Editable transaction table (date, name, description, category, amount)
- Category autocomplete with add/delete support
- Search across name, description, and category
- Running total for current table view
- Local-only processing (no backend required)

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand (state management)
- PapaParse (CSV parsing)
- Zod (validation and coercion)
- React Dropzone (file input UX)
- React Toastify (notifications)
- CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ (or newer LTS)
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## CSV Template

Use the template file in public/transaction-template.csv.

Expected headers:

```csv
transactionDate,name,description,category,amount
```

## Validation Rules

Transactions are parsed in src/utils/parseTransactions.tsx.

- transactionDate: required, must parse to a valid Date
- name: required, non-empty string
- description: optional, defaults to empty string
- category: optional, defaults to empty string
- amount: required, valid finite number (supports values like $1,234.56)

Invalid rows are skipped and reported with row-level errors.

## Application Flow

1. User uploads a CSV file in the Instructions view.
2. CSV rows are parsed and validated.
3. Valid rows are stored as initial and current transactions in Zustand.
4. Home view renders editable table data from current transactions.
5. User can edit, filter, and delete rows without leaving the browser.

## State Management

### Transactions Store

File: src/stores/transactions.store.tsx

- initialTransactions: original parsed data
- currentTransactions: actively edited/filtered data
- actions for set, update, delete, and clear

### Categories Store

File: src/stores/categories.store.tsx

- category list initialized from constants
- addCategory and deleteCategory actions

## Project Structure

```text
src/
	components/
		header/
		home/
			component/
				TransactionsTable.tsx
		instructions/
			component/
				TransactionsDropzone.tsx
		shared/
			CategoryAutoComplete.tsx
			CurrencyInput.tsx
			DateInput.tsx
			TextInput.tsx
	stores/
		transactions.store.tsx
		categories.store.tsx
	utils/
		parseTransactions.tsx
	types/
		transaction.types.tsx
```

## Privacy

This app is designed for local use. It does not require a backend to parse or review your transactions.

## Notes

- Current transaction IDs are assigned from row index during parsing.
- If duplicate IDs are introduced by custom imports, update logic may affect multiple rows with the same ID.

## Roadmap Ideas

- Import/export edited CSV
- Persist store state to localStorage
- Undo/redo edits
- Sorting and pagination
- Stronger date format guidance in UI

