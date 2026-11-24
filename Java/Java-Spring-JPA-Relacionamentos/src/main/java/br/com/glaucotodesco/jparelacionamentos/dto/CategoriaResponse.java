package br.com.glaucotodesco.jparelacionamentos.dto;

import br.com.glaucotodesco.jparelacionamentos.model.Categoria;
import br.com.glaucotodesco.jparelacionamentos.model.Curso;

import java.util.Comparator;
import java.util.List;

public record CategoriaResponse(
        Long id,
        String nome,
        List<CursoResumoResponse> cursos
) {
    public static CategoriaResponse from(Categoria categoria) {
        var cursos = categoria.getCursos().stream()
                .sorted(Comparator.comparing(Curso::getId))
                .map(CursoResumoResponse::from)
                .toList();

        return new CategoriaResponse(categoria.getId(), categoria.getNome(), cursos);
    }
}
