package camt.se234.lab10.service;


import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
public class GradeServiceImplTest {
    @Test
    public void testGetGrade(){
        GradeServiceImpl gradeService = new GradeServiceImpl();
        assertThat(gradeService.getGrade(100),is("A"));
        assertThat(gradeService.getGrade(79),is("A"));
        assertThat(gradeService.getGrade(78.9),is("B"));
        assertThat(gradeService.getGrade(75),is("B"));
        assertThat(gradeService.getGrade(74.4),is("C"));
        assertThat(gradeService.getGrade(59.2),is("C"));
        assertThat(gradeService.getGrade(59),is("D"));
        assertThat(gradeService.getGrade(34),is("D"));
        assertThat(gradeService.getGrade(33),is("F"));
        assertThat(gradeService.getGrade(0),is("F"));

    }

}