<div id="app-content">
<center><b>Wordfind v1.3 &nbsp&nbsp&nbsp by DerBen</b>&nbsp&nbsp&nbsp
<button id='wftogsetup'>-Settings Toggle-</button>
<button id='wfstart'>-Generate-</button>
<div id='wfconf'>
<p>To play, click (or touch) the first letter of the word you found in the puzzle and then click the last letter.<br>The word will be crossed off from the list automatically, if it matches. <br><p>
<h3>Create your puzzle below!</h3>
Width x Height:<input type='text' id='wfsize' value='15x20'><p>
Letter size:<input type='text' id='ftsize' value='22'><p>
<label for="word">Choose word list:</label>
<select id="word"></select><p>
Words, comma separated.<br>
<textarea id='words' cols='50' rows='8'></textarea><br>
<button id='wfstart2'>-Generate-</button>
<p>If some of your words disappear, try making the puzzle bigger!
</div><p><div id='wordz'></div>
<p><canvas id="canvas"></canvas>
</center>
</div>