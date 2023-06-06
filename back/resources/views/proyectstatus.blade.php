<table border="1">
    <thead>
    <tr>
        <th style="background: #1976D2; color: #FFFFFF; text-align: center;" rowspan="2" colspan="8">MyPipeline</th>
    </tr>
    <tr>
        <th></th>
    </tr>
    <tr>
        <th style="background: #4490db; color: white; text-align: center;" colspan="2">Cliente</th>
        <th style="background: #4490db; color: white; text-align: center;" colspan="2">Proyecto</th>
        <th style="background: #4490db; color: white; text-align: center;" colspan="2">Fase</th>
        <th style="background: #4490db; color: white; text-align: center;" colspan="2">Fecha ultima tarea</th>
    </tr>
    </thead>
    <tbody>
    @foreach($proyectos as $proyecto)
        <tr>
            <td colspan="2">{{ $proyecto->cliente }}</td>
            <td colspan="2">{{ $proyecto->name }}</td>
            <td colspan="2" style="background: <?=$proyecto->color?>;">{{ $proyecto->fase }}</td>
            <td colspan="2">{{ $proyecto->last_task }}</td>
        </tr>
    @endforeach
    </tbody>
</table>