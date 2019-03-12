
import javax.swing.table.DefaultTableModel;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author jamsubzero
 */
public class TableModels 
{
        
        
public DefaultTableModel senateModel = new javax.swing.table.DefaultTableModel(
    new Object [][] {

    },
    new String [] {
        "Candidate", "Votes"
    }
) {
    boolean[] canEdit = new boolean [] {
        false, false
    };

    public boolean isCellEditable(int rowIndex, int columnIndex) {
        return canEdit [columnIndex];
    }
};

}


