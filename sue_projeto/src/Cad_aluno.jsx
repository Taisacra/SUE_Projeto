function Cad_aluno({props}){
    return(
        <div>
            <form>
                <label for="usuario">Usuário: </label>
                <input type="text" id="usuario" name="usuario"/>
                <label for="email">E-mail:</label>
                <input type="text" name="email" id="email" />
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
