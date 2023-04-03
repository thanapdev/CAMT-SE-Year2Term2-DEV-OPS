package camt.se234.lab10.graphql;

import camt.se234.lab10.entity.Grade;
import camt.se234.lab10.service.GradeService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueryGrade implements GraphQLQueryResolver {
    @Autowired
    GradeService gradeService;
    public Grade getGradeFromScore(double score){
        return Grade.builder().grade(gradeService.getGrade(score)).build();
    }
}
