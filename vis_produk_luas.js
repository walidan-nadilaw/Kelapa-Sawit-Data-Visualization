function PlotProduksiLuas() {
    Promise.all([

        new Promise((resolve, reject) => {
            Plotly.d3.csv("dataframe/produksi_sawit.csv", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }),

        new Promise((resolve, reject) => {
            Plotly.d3.csv("dataframe/luas_sawit.csv", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })

    ]).then( ([produk_df, luas_df]) => {


        const clean_produk = produk_df.map( (row, idx) => ( {
            prov : row['Provinsi'],
            prod : parseFloat( row['Kelapa Sawit'] ),
            luas : parseFloat( luas_df[idx]['Kelapa Sawit'])
        } ) )
            .filter( r => r.prov !== 'INDONESIA' && !isNaN(r.prod) )
            .sort( (a,b) => (b.prod ) - ( a.prod ) );

        console.log(clean_produk)

        const provinsi = clean_produk.map(r => r.prov);
        const produksi = clean_produk.map(r => r.prod);
        const luas_lahan = clean_produk.map( r => r.luas);

        const data = [
            {
                x : provinsi,
                y : produksi,
                type : 'bar',
                name : 'produksi',
                marker : {
                    color : '#50C878'
                }
            },
            {
                x : provinsi,
                y : luas_lahan,
                type : 'bar',
                name : 'luas lahan',
                marker : {
                    color : '#0096FF'
                }
            }
        ];

        const layout = {
            title : 'luas lahan kelapa sawit per provinsi'.toUpperCase(),
            xaxis : {title : 'PROVINSI'},
            yaxis : {title : 'TON & HEKTAR'},
            margin: {
                l: 150,  // left
                r: 80,  // right
                b: 150, // bottom (increase this to move x-axis up and give room for labels)
                t: 80   // top
            }
        }

        Plotly.newPlot('test', data, layout, {responsive: true});

    } ).catch( err => console.error(err) );
}


