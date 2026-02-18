import { AppDataSource } from '../src/database/data-source';

async function main() {
  console.log('1) initializing datasource...');
  await AppDataSource.initialize();
  console.log('2) connected OK');
  await AppDataSource.destroy();
  console.log('3) closed OK');
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
