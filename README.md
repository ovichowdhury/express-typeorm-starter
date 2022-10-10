# Boilerplate for Express, TypeOrm

## How to Recreate ?

Please go through the readme of typeorm-v2 Branch

## Commands

### Development Start
``` bash
yarn dev
```

### Build Project
``` bash
yarn build
```

### Production Start
``` bash
yarn start
```

## Database Migration Commands


### Generate Migration
``` bash
yarn migration:generate ./src/database/migration/NameOfMigration
```

### Run Migration (Optional)
``` bash
yarn migration:run
```

### Revert Migration
``` bash
yarn migration:revert
```