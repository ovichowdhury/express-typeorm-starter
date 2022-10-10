## How to Recreate ?

Please go through the readme of typeorm-v2 Branch

## Commands

### Develpoment Start
``` bash
yarn dev
```

### Build Project
``` bash
yarn build
```

### Produciton Start
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