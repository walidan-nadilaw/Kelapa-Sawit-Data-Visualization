Plotly.d3.csv("upah.df.csv", function(err, rows) {
    if (err) {
        console.error(err);
        return;
    }

    const prov = "DKI JAKARTA"

    console.log( [...new Set( rows.map(row => row["provinsi"]) ) ] )

    let jakarta = rows.filter( row => row['provinsi'] === prov);
    let th = jakarta.map(row => row["tahun"]);
    let up = jakarta.map(row => parseFloat(row["upah"]));

    let data = [{
        x : th,
        y : up,
        type : "scatter",
        mode : "lines+markers",
        name : "rata-rata upah",
        line : {
            color : "blue",
            width : 2
        }
    }];

    let layout = {
        title : 'pertumbuhan rata-rata upah per jam pekerja di '+prov,
        xaxis : {title : 'Tahun'},
        yaxis : {title : 'rata-rata upah (Rp)'},
        font  : { size : 18}
    };

    Plotly.newPlot('test', data, layout);
});