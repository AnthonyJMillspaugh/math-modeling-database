# The math_modeling_paper Database

## Creating the Docker Container

1. Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
2. Navigate to the correct directory `cd math-modeling-papers-database`
3. Run `docker compose up -d`

## Using with MySQLWorkbench (root user)

1. On the homepage, add a new connection.
2. Make sure the port is correct (in this case 4040).
3. Create a connection name ("docker root" for example).
4. Type the root password (in this case "mysql").