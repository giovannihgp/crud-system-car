#!/bin/sh

echo "Aguardando MySQL iniciar..."

until nc -z mysql 3306; do
  sleep 1
done

echo "MySQL está pronto!"

if [ ! -d "vendor" ]; then
  echo "Instalando dependências do Composer..."
  composer install
fi

echo "Executando migrate e seeds..."

php artisan migrate --seed --force

echo "Feito!"

php artisan serve --host=0.0.0.0 --port=8000