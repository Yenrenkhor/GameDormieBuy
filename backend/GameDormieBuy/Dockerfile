FROM maven:3.9.8-eclipse-temurin-21 as build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
COPY --from=build /target/GameDormieBuy-0.0.1-SNAPSHOT.jar GameDormieBuy-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "GameDormieBuy-0.0.1-SNAPSHOT.jar"]