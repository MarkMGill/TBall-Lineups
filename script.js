let playersObj = [];
const btnLineups = document.getElementById('btnLineups');
const jsDisplayPlayer = document.getElementById('js__displayPlayer');
const jsDisplayInning = document.getElementById('js__displayInning');

btnLineups.addEventListener('click', function() {
   
    let jsNumOfInnings = Number(document.getElementById('js__numOfInnings').value);
    let players = document.querySelectorAll('.js__player');
    
    // convert node list of players to array list of players and remove empty spaces
    players.forEach(cur => {
        if(cur.value.trim() !== '') {playersObj.push(
        {
                name: cur.value.trim(),
                positions: []
            }
        )} 
    });
    
    console.log(playersObj);
    // all the magic happens
    let lineups = randomizeLineups(playersObj);
    assignPositions(lineups, jsNumOfInnings);
    clearDisplay();
    //console.log(lineups);
    displayLineups(lineups, jsNumOfInnings);
});

function randomizeLineups(arr) {
    
    // randomize lineups
    let r;
    let newArr = [];
    for(let i = 0; i < arr.length + i; i++) {
        r = Math.floor(Math.random() * arr.length);
        newArr.push(arr[r]);
        arr.splice(r, 1);
    }
    return newArr;
}

function assignPositions(playersArray, numOfInnings) {
    
    let index = 0;
    for(let i = 0; i < numOfInnings; i++) {
        
        // list all positions in an array and remove additional positions to match amount of players on team
        let positions = ['Pitcher', '1st Base', '2nd Base', '3rd Base', 'Shortstop', 'Left Field', 'Right Field', 'Center Field', 'Right Center Field', 'Left Center Field', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional', 'Bench/Optional'];
        positions.splice(playersArray.length);
        console.log(playersArray);
        console.log(positions);
        // loop through randomPositions and add positions to each player in players array
        for(let i = 0; i < positions.length; i++) {
            if(i + index > positions.length - 1) {
                playersArray[i].positions.push(positions[(i + index) % positions.length]);
            } else {
                playersArray[i].positions.push(positions[i + index]);
            }
        }
        index += (playersArray.length % 3 === 0) ? 4 : 3;
    }
}

function clearDisplay() {
    
    // clear modal box before displaying lineups
    //$("#clearTable").find("tr:gt(0)").remove();
    //jsDisplayInning.innerHTML = '<th>#</th><th>Name</th>';
}

function displayLineups(lineupsArr, numInnings) {
    
    /********* CREATE HTML TABLE *********/
    /*************************************/
    
    //--->create data table > start
	var tbl = '';
	tbl +='<table class="table table-striped table-hover">'

		//--->create table header > start
		tbl +='<thead>';
			tbl +='<tr id="js__displayInning">';
			tbl +='<th>#</th>';
			tbl +='<th>Name</th>';
            for(let i = 0; i < numInnings; i++) {
                tbl +='<th>Inning ' + (i + 1) + '</th>';
            }
            tbl +='<th>Options</th>';
			tbl +='</tr>';
		tbl +='</thead>';
		//--->create table header > end
        
        //--->create table body > start
		tbl +='<tbody>';

			//--->create table body rows > start
			for(let i = 0; i < lineupsArr.length; i++) 
			{
				//you can replace with your database row id
				var row_id = (i + 1);

				//loop through lineupsArr row data
				tbl +='<tr row_id="'+row_id+'">';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="rowNum">'+row_id+'</div></td>';
					tbl +='<td ><div class="row_data" edit_type="click" col_name="name">'+lineupsArr[i].name+'</div></td>';
                    lineupsArr[i].positions.forEach(cur => {
                        tbl +='<td ><div class="row_data" edit_type="click" col_name="position">'+cur+'</div></td>';
                        //$(this).closest('tr').setAttribute('col_name', ('position' + i));
                    });

					//--->edit options > start
					tbl +='<td>';
				        
						tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';

						//only show this button if edit button is clicked
						tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
						tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';

					tbl +='</td>';
					//--->edit options > end
					
				tbl +='</tr>';
			}

			//--->create table body rows > end

		tbl +='</tbody>';
		//--->create table body > end

	tbl +='</table>'	
	//--->create data table > end
    
    
    /********* SHOW TEAM NAME AND HTML TABLE *********/
    /*************************************************/
    
    // display team name
    let teamName = document.getElementById('js__teamName').value;
    let displayTeam = document.getElementById('js__displayTeam');
    displayTeam.innerHTML = teamName + ' Team Lineups';
    
    //out put table data
    //$(document).find('.tbl_user_data').html(tbl);
    let tblUserData = document.querySelector('.table_user_data');
    tblUserData.innerHTML = tbl;
    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide(); 
    
    
    /********* MAKE HTML TABLE EDITABLE *********/
    /********************************************/
    
    //--->make div editable > start
    $(document).on('click', '.row_data', function(event) 
    {
        event.preventDefault(); 

        if($(this).attr('edit_type') == 'button')
        {
            return false; 
        }

        //make div editable
        $(this).closest('div').attr('contenteditable', 'true');
        //add bg css
        $(this).addClass('bg-light border rounded').css('padding','5px');

        $(this).focus();
    })	
    //--->make div editable > end
    
    
    /********* MAKE WHOLE TABLE ROW EDITABLE *********/
    /*************************************************/
    
    //--->button > edit > start	
    $(document).on('click', '.btn_edit', function(event) 
    {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        var row_id = tbl_row.attr('row_id');

        tbl_row.find('.btn_save').show();
        tbl_row.find('.btn_cancel').show();

        //hide edit button
        tbl_row.find('.btn_edit').hide(); 

        //make the whole row editable
        tbl_row.find('.row_data')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        .addClass('bg-light border rounded')
        .css('padding','5px');

        //--->add the original entry > start
        tbl_row.find('.row_data').each(function(index, val) 
        {  
            //this will help in case user decided to click on cancel button
            $(this).attr('original_entry', $(this).html());
        }); 		
        //--->add the original entry > end

    });
    //--->button > edit > end
    
    
    /********* CANCEL USER TABLE DATA ENTRY *********/
    /************************************************/
    
     //--->button > cancel > start	
    $(document).on('click', '.btn_cancel', function(event) 
    {
        event.preventDefault();

        var tbl_row = $(this).closest('tr');

        var row_id = tbl_row.attr('row_id');

        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();

        //show edit button
        tbl_row.find('.btn_edit').show();

        //make the whole row editable
        tbl_row.find('.row_data')
        .attr('edit_type', 'click')	 
        .removeClass('bg-light border rounded')
        .css('padding','') 

        tbl_row.find('.row_data').each(function(index, val) 
        {   
            $(this).html( $(this).attr('original_entry') ); 
        });  
    });
    //--->button > cancel > end
    
    }

    
    /********* SAVE WHOLE TABLE ROW DATA ENTRY *********/
    /************************************************/

    //--->save whole row entery > start	
    $(document).on('click', '.btn_save', function(event) 
    {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        var row_id = tbl_row.attr('row_id');


        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();

        //show edit button
        tbl_row.find('.btn_edit').show();


        //make the whole row editable
        tbl_row.find('.row_data')
        .attr('edit_type', 'click')	
        .removeClass('bg-light border rounded')
        .css('padding','') 
        
        /*
        //--->get row data > start
        var arr = {}; 
        tbl_row.find('.row_data').each(function(index, val) 
        {   
            var col_name = $(this).attr('col_name');  
            var col_val  =  $(this).html();
            arr[col_name] = col_val;
        });
        //--->get row data > end

        //use the "arr"	object for your ajax call
        $.extend(arr, {row_id:row_id});

        //out put to show
        $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
        */

    });
    //--->save whole row entery > end


    /********* SAVE SINGLE HTML TABLE CELL DATA *********/
    /************************************************/
    //--->save single field data > start
    $(document).on('focusout', '.row_data', function(event) 
    {
        event.preventDefault();

        if($(this).attr('edit_type') == 'button')
        {
            return false; 
        }

        var row_id = $(this).closest('tr').attr('row_id'); 

        var row_div = $(this)			
        .removeClass('bg-light border rounded') //add bg css
        .css('padding','')
        /*
        var col_name = row_div.attr('col_name'); 
        var col_val = row_div.html(); 

        var arr = {};
        arr[col_name] = col_val;

        //use the "arr"	object for your ajax call
        $.extend(arr, {row_id:row_id});

        //out put to show
        $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
        */
    })	
    //--->save single field data > end


    /************ CREATE PRINTABLE DOCUMENT *********/
    /************************************************/

$('.js__printTable').click(function() {
    let printme = document.querySelector('.table');
    let wme = window.open("", "", "width=900,height=700");
    wme.document.write(printme.outerHTML);
    wme.document.close();
    wme.focus();
    wme.print();
    wme.close();
});


















