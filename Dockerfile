FROM postgres:10.6

COPY ./ddl /docker-entrypoint-initdb.d/
