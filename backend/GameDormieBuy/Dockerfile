FROM eclipse-temurin:21
EXPOSE 8080
RUN mkdir /opt/app
COPY target/GameDormieBuy-0.0.1-SNAPSHOT.jar /opt/app
ENTRYPOINT ["java","-jar", "/opt/app/GameDormieBuy-0.0.1-SNAPSHOT.jar"]